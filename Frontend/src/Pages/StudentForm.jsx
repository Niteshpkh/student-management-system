import React from "react";

const StudentForm = ({
  student,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="modal-overlay">

      <div className="student-modal">

        <div className="modal-header">
          <div>
            <h2>
              {student.id ? "Update Student" : "Add Student"}
            </h2>

            <p>
              {student.id
                ? "Update student information"
                : "Enter student information"}
            </p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={student.name}
                placeholder="Enter student name"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                value={student.age}
                placeholder="Enter age"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Grade</label>

              <input
                type="text"
                name="grade"
                value={student.grade}
                placeholder="Enter grade"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label>Parent Name</label>

              <input
                type="text"
                name="Parents_name"
                value={student.Parents_name}
                placeholder="Enter parent name"
                onChange={onChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Contact Number</label>

              <input
                type="tel"
                name="contact_no"
                value={student.contact_no}
                placeholder="Enter contact number"
                onChange={onChange}
              />
            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {student.id ? "Update Student" : "Add Student"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default StudentForm;