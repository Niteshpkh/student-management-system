import React from "react";
import StudentRow from "./StudentRow";

const StudentTable = ({
  students,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="student-table-card">

      <div className="table-header">
        <div>
          <h2>Student List</h2>
          <p>All registered students</p>
        </div>

        <span className="student-count">
          {students.length} Students
        </span>
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Loading students...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👨‍🎓</div>

          <h3>No Students Found</h3>

          <p>
            Add your first student to get started.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">

          <table className="student-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Parent Name</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default StudentTable;