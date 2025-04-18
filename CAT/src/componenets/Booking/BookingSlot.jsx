import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "../style/bookingslot.css";
import allaxios from "../../api/axios";
import { Modal } from "react-bootstrap";
import { API_URL } from "../../api/api_url";
import * as XLSX from "xlsx";

const BookingSlot = () => {
  const [bookingslot, setBookingSlot] = useState([]);
  const [filteredSlot, setFilteredSlot] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [target, setTarget] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [session_type, setSessiontype] = useState("");
  const [time_slot, setTimeslot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBookingSlot();
  }, []);

  const fetchBookingSlot = async () => {
    try {
      const response = await allaxios.get(API_URL.BOOKING.GET_BOOKING);
      setBookingSlot(response.data);
      setFilteredSlot(response.data);
    } catch (error) {
      console.error("Error fetching booking list:", error);
    }
  };

  const handleFilterChange = (e) => {
    const date = e.target.value;
    setFilterDate(date);
    setCurrentPage(1); // Reset to first page when filtering
    if (date) {
      const filtered = bookingslot.filter((item) =>
        item.time_slot && item.time_slot.date === date
      );
      setFilteredSlot(filtered);
    } else {
      setFilteredSlot(bookingslot);
    }
  };

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSlot.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSlot.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExcelExport = () => {
    // Export all filtered data, not just current page
    const exportData = filteredSlot.map(slot => ({
      'S.NO': filteredSlot.indexOf(slot) + 1,
      'First Name': slot.name,
      'Last Name': slot.last_name,
      'Target': slot.target,
      'Email ID': slot.email,
      'Mobile No.': slot.mobile,
      'Session Type': slot.session_type,
      'Date': slot.time_slot?.date || '',
      'Start Time': slot.time_slot?.start_time || '',
      'End Time': slot.time_slot?.end_time || '',
      'Time Period': slot.time_slot?.time_period || '',
      'Course Name': slot.time_slot?.course_name || '',
      'Duration (mins)': slot.time_slot?.time_duration || '',
      'Zoom Link': slot.time_slot?.zoom_link || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BookingSlots");
    
    // Auto-size columns
    const maxWidth = Object.keys(exportData[0] || {}).reduce((acc, key) => {
      return { ...acc, [key]: Math.max(key.length, ...exportData.map(row => String(row[key]).length)) };
    }, {});
    
    worksheet['!cols'] = Object.values(maxWidth).map(width => ({ width: width + 2 }));
    
    XLSX.writeFile(workbook, `booking_slots_${filterDate || 'all'}.xlsx`);
  };

  const handleEdit = (bookingslot) => {
    setShowForm(true);
    setEditId(bookingslot.id);
    setName(bookingslot.name);
    setLastName(bookingslot.last_name);
    setTarget(bookingslot.target);
    setEmail(bookingslot.email);
    setMobile(bookingslot.mobile);
    setSessiontype(bookingslot.session_type);
    setTimeslot(bookingslot.time_slot);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking list?")) {
      try {
        await allaxios.delete(API_URL.BOOKING.BOOKING_DELETE(id));
        fetchBookingSlot();
      } catch (error) {
        console.error("Error deleting booking list:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      name,
      last_name,
      target,
      email,
      mobile,
      session_type,
      time_slot,
    };

    try {
      if (editId) {
        await allaxios.patch(API_URL.BOOKING.BOOKING_PATCH(editId), formData);
      }
      fetchBookingSlot();
      setShowForm(false);
    } catch (error) {
      setError("Failed to update booking list. Please try again.");
      console.error("Error saving form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4><b>STUDENTS LIST</b></h4>
        <div className="d-flex gap-2">
          <div className="input-group">
            <input
              type="date"
              className="form-control form-control-sm"
              value={filterDate}
              onChange={handleFilterChange}
              style={{ maxWidth: "160px" }}
            />
            {filterDate && (
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  setFilterDate("");
                  setFilteredSlot(bookingslot);
                  setCurrentPage(1);
                }}
              >
                Clear
              </button>
            )}
          </div>
          <button 
            className="btn btn-sm btn-success" 
            onClick={handleExcelExport}
            disabled={filteredSlot.length === 0}
          >
            Export to Excel
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '70px' }}>S.NO</th>
              <th style={{ minWidth: '100px' }}>First Name</th>
              <th style={{ minWidth: '100px' }}>Last Name</th>
              <th style={{ minWidth: '80px' }}>Target</th>
              <th style={{ minWidth: '200px' }}>Email ID</th>
              <th style={{ minWidth: '120px' }}>Mobile No.</th>
              <th style={{ minWidth: '120px' }}>Session Type</th>
              <th style={{ minWidth: '120px' }}>Date</th>
              <th style={{ minWidth: '180px' }}>Time Slot</th>
              <th style={{ minWidth: '100px' }}>Course</th>
              <th style={{ minWidth: '100px' }}>Zoom Link</th>
              <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((bookingslot, index) => (
                <tr key={bookingslot.id}>
                  <td className="text-center">{indexOfFirstItem + index + 1}</td>
                  <td>{bookingslot.name}</td>
                  <td>{bookingslot.last_name}</td>
                  <td className="text-center">{bookingslot.target}</td>
                  <td>{bookingslot.email}</td>
                  <td className="text-center">{bookingslot.mobile}</td>
                  <td className="text-center">{bookingslot.session_type}</td>
                  <td className="text-center">{bookingslot.time_slot?.date || '-'}</td>
                  <td className="text-center">{`${bookingslot.time_slot?.start_time || '-'} - ${bookingslot.time_slot?.end_time || '-'}`}</td>
                  <td className="text-center">{bookingslot.time_slot?.course_name || '-'}</td>
                  <td className="text-center">
                    {bookingslot.time_slot?.zoom_link ? (
                      <a 
                        href={bookingslot.time_slot.zoom_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-info"
                      >
                        Join
                      </a>
                    ) : '-'}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => handleEdit(bookingslot)}
                      title="Edit"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(bookingslot.id)}
                      title="Delete"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredSlot.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSlot.length)} of {filteredSlot.length} entries
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Modal for editing */}
      <Modal size="lg" centered show={showForm} onHide={() => setShowForm(false)}>
        <div className="modal-content custom-modal p-3 w-100">
          <h5 className="modal-title">
            <strong>Edit Booking</strong>
          </h5>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className="form-label">Name</label>
            <input
              className="form-control mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="form-label">Last Name</label>
            <input
              className="form-control mb-2"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label className="form-label">Target</label>
            <input
              className="form-control mb-2"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
            <label className="form-label">Email</label>
            <input
              className="form-control mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="form-label">Phone Number</label>
            <input
              className="form-control mb-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <label className="form-label">Session Type</label>
            <input
              className="form-control mb-2"
              value={session_type}
              onChange={(e) => setSessiontype(e.target.value)}
              required
            />
            <label className="form-label">Time Slot</label>
            <input
              className="form-control mb-2"
              value={time_slot}
              onChange={(e) => setTimeslot(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BookingSlot;
