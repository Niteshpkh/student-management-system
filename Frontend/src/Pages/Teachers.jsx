import React, { useEffect, useState } from 'react';
import DataTable from '../Components/DataTable';
import api from '../../api/axios';
import './Teachers.css';

const Teachers = () => {
  const initialFormState = {
    teachers_name: "",
    email: "",
    qualification: "",
    teacher_phone_no: "",
    subject: ""
  };

  const [teacher, setTeacher] = useState(initialFormState);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Error state handlers
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const columns = [
    { label: "Name", key: "teachers_name" },
    { label: "Email", key: "email" },
    { label: "Qualification", key: "qualification" },
    { label: "Phone", key: "teacher_phone_no" },
    { label: "Subject", key: "subject" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear individual field error as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const getTeachers = async () => {
    try {
      const response = await api.get("/teacher_data");
      const list = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.teachers)
        ? response.data.teachers
        : Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      setTeachers(list);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setGeneralError("Failed to fetch teachers list.");
      setTeachers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setFieldErrors({});

    setLoading(true);
    try {
      await api.post("/teacher_data", teacher);
      await getTeachers();
      setTeacher(initialFormState);
    } catch (err) {
      console.error("Backend error response:", err.response);

      const responseData = err.response?.data;

      // Check if Spring returned a map of field-specific errors
      if (responseData?.errors && typeof responseData.errors === 'object') {
        setFieldErrors(responseData.errors);
      } else if (responseData?.message) {
        // Flat message fallback
        setGeneralError(responseData.message);
      } else {
        setGeneralError("An unexpected error occurred while saving.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/teacher_data/${id}`);
      setTeachers((prev) => prev.filter((t) => (t.id || t._id) !== id));
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert(err.response?.data?.message || "Failed to delete teacher.");
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="teachers-container">
      <div className="teachers-header">
        <h2>Teacher Management</h2>
      </div>

      {/* Top general alert */}
      {generalError && <div className="error-alert">{generalError}</div>}

      <form className="teacher-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Teacher Name */}
          <div className="form-group">
            <label>Teacher Name</label>
            <input
              className={`form-input ${fieldErrors.teachers_name ? "input-has-error" : ""}`}
              type="text"
              name="teachers_name"
              value={teacher.teachers_name}
              placeholder="Full name"
              onChange={handleChange}
              required
            />
            {fieldErrors.teachers_name && (
              <span className="field-error">{fieldErrors.teachers_name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              className={`form-input ${fieldErrors.email ? "input-has-error" : ""}`}
              type="email"
              name="email"
              value={teacher.email}
              placeholder="teacher@school.edu"
              onChange={handleChange}
              required
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          {/* Qualification */}
          <div className="form-group">
            <label>Qualification</label>
            <input
              className={`form-input ${fieldErrors.qualification ? "input-has-error" : ""}`}
              type="text"
              name="qualification"
              value={teacher.qualification}
              placeholder="e.g. M.Sc, B.Ed"
              onChange={handleChange}
            />
            {fieldErrors.qualification && (
              <span className="field-error">{fieldErrors.qualification}</span>
            )}
          </div>

          {/* Phone Number with validation rendering */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              className={`form-input ${fieldErrors.teacher_phone_no ? "input-has-error" : ""}`}
              type="tel"
              name="teacher_phone_no"
              value={teacher.teacher_phone_no}
              placeholder="At least 10 digits"
              minLength={10}
              maxLength={15}
              onChange={handleChange}
              required
            />
            {fieldErrors.teacher_phone_no && (
              <span className="field-error">{fieldErrors.teacher_phone_no}</span>
            )}
          </div>

          {/* Subject */}
          <div className="form-group">
            <label>Subject</label>
            <input
              className={`form-input ${fieldErrors.subject ? "input-has-error" : ""}`}
              type="text"
              name="subject"
              value={teacher.subject}
              placeholder="e.g. Mathematics"
              onChange={handleChange}
            />
            {fieldErrors.subject && (
              <span className="field-error">{fieldErrors.subject}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Teacher"}
          </button>
        </div>
      </form>

      <DataTable 
        columns={columns} 
        data={teachers} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default Teachers;