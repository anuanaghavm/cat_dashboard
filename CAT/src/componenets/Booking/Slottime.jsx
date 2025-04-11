import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "../style/slottime.css";
import allaxios from "../../api/axios";
import { Modal } from "react-bootstrap";
import { API_URL } from "../../api/api_url";

const Slottime = () => {
  const [slottime, SetSlottime] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [session_type, setsessiontype] = useState("");
  const [start_time, setstarttime] = useState("");
  const [end_time, setendtime] = useState("");
  const [max_capacity, setmaxcapacity] = useState("");
  const [zoom_link, setzoomlink] = useState("");
  const [time_period, settimeperiod] = useState("");
  const [date, setdate] = useState("");
  const [course_name, setCoursename] = useState("");
  const [time_duration, setTimeDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSlottime();
  }, []);

  const fetchSlottime = async () => {
    try {
      const response = await allaxios.get(API_URL.SLOTTIME.GET_SLOT);
      const sortedSlots = response.data.slots.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
      SetSlottime(sortedSlots);
    } catch (error) {
      console.error("Error fetching slottime:", error);
    }
  };

  const handleNew = () => {
    setShowForm(true);
    setsessiontype("");
    setstarttime("");
    setendtime("");
    setmaxcapacity("");
    setzoomlink("");
    settimeperiod("");
    setdate("");
    setCoursename("");
    setTimeDuration("");
    setEditId(null);
    setError("");
  };

  const handleEdit = (slot) => {
    setShowForm(true);
    setEditId(slot.id);
    setsessiontype(slot.session_type);
    setstarttime(slot.start_time);
    setendtime(slot.end_time);
    setmaxcapacity(slot.max_capacity);
    setzoomlink(slot.zoom_link);
    settimeperiod(slot.time_period);
    setCoursename(slot.course_name);
    setTimeDuration(slot.time_duration);
    setdate(slot.date);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      try {
        await allaxios.delete(API_URL.SLOTTIME.SLOT_DELETE(id));
        fetchSlottime();
      } catch (error) {
        console.error("Error deleting slot:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      session_type,
      start_time,
      end_time,
      max_capacity,
      zoom_link,
      time_period,
      date,
      course_name,
      time_duration
    };

    try {
      if (editId) {
        await allaxios.patch(API_URL.SLOTTIME.SLOT_PATCH(editId), formData);
      } else {
        await allaxios.post(API_URL.SLOTTIME.POST_SLOT, formData);
      }
      fetchSlottime();
      setShowForm(false);
    } catch (error) {
      setError("Failed to save slot. Please try again.");
      console.error("Error saving slot:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h4><b>SLOTTIME LIST</b></h4>
        <button className="btn btn-primary" onClick={handleNew}>Add New</button>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Session Type</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Max Capacity</th>
            <th>Time Period</th>
            <th>Date</th>
            <th>Zoom Link</th>
            <th>Course Name</th>
            <th>Time Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slottime.length > 0 ? (
            slottime.map((slot, index) => (
              <tr key={slot.id}>
                <td>{index + 1}</td>
                <td>{slot.session_type}</td>
                <td>{slot.start_time}</td>
                <td>{slot.end_time}</td>
                <td>{slot.max_capacity}</td>
                <td>{slot.time_period}</td>
                <td>{slot.date}</td>
                <td>
                  <a href={slot.zoom_link} target="_blank" rel="noreferrer">Link</a>
                </td>
                <td>{slot.course_name}</td>
                <td>{slot.time_duration}</td>
                <td>
                  <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(slot)}><AiFillEdit /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(slot.id)}><AiFillDelete /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">No slots found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal size="mg" centered show={showForm} onHide={() => setShowForm(false)}>
        <div className="modal-content p-3">
          <h5 className="modal-title mb-3">
            <strong>{editId ? "Edit Slot" : "Add Slot"}</strong>
          </h5>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label className="mb-2"><b>Session Type</b></label>
                <select
                  className="form-control"
                  value={session_type}
                  onChange={(e) => setsessiontype(e.target.value)}
                  required
                >
                  <option value="">Select Session Type</option>
                  <option value="One_to_one">One_to_One</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="mb-2"><b>Start Time</b></label>
                <input
                  className="form-control"
                  value={start_time}
                  onChange={(e) => setstarttime(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2"><b>End Time</b></label>
                <input
                  className="form-control"
                  value={end_time}
                  onChange={(e) => setendtime(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2"><b>Max Capacity</b></label>
                <input
                  className="form-control"
                  value={max_capacity}
                  onChange={(e) => setmaxcapacity(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="mb-2"><b>Date</b></label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2"><b>Time Period</b></label>
                <input
                  className="form-control"
                  value={time_period}
                  onChange={(e) => settimeperiod(e.target.value)}
                />
              </div>

              {/* ✅ Rearranged section below */}
              <div className="col-md-6 my-2">
                <label className="mb-2"><b>Zoom Link</b></label>
                <input
                  className="form-control"
                  value={zoom_link}
                  onChange={(e) => setzoomlink(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2"><b>Time Duration</b></label>
                <input
                  className="form-control"
                  value={time_duration}
                  onChange={(e) => setTimeDuration(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 my-2">
                <label className="mb-2"><b>Course Name</b></label>
                <input
                  className="form-control"
                  value={course_name}
                  onChange={(e) => setCoursename(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-3" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="btn btn-secondary ml-2 mt-3" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Slottime;
