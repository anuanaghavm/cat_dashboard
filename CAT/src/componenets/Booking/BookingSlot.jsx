import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "../style/bookingslot.css";
import allaxios from "../../api/axios";
import { Modal } from "react-bootstrap";
import { API_URL } from "../../api/api_url";

const BookingSlot = () => {
  const [bookingslot, setBookingSlot] = useState([]);
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

  useEffect(() => {
    fetchBookingSlot();
  }, []);

  const fetchBookingSlot = async () => {
    try {
      const response = await allaxios.get(API_URL.BOOKING.GET_BOOKING);
      setBookingSlot(response.data);
    } catch (error) {
      console.error("Error fetching booking list:", error);
    }
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
      <h4><b>STUDENTS LIST</b></h4>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>slno</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Target</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Session</th>
            <th>Time slot</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingslot.length > 0 ? (
            bookingslot.map((bookingslot, index) => (
              <tr key={bookingslot.id}>
                <td>{index + 1}</td>
                <td>{bookingslot.name}</td>
                <td>{bookingslot.last_name}</td>
                <td>{bookingslot.target}</td>
                <td>{bookingslot.email}</td>
                <td>{bookingslot.mobile}</td>
                <td>{bookingslot.session_type}</td>
                <td>{bookingslot.time_slot}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(bookingslot)}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(bookingslot.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
