import React from "react";

const StudentRow = ({
  student,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>

      <td>
        <div className="student-name">
          <div className="student-avatar">
            {student.name?.charAt(0).toUpperCase()}
          </div>

          <span>{student.name}</span>
        </div>
      </td>

      <td>{student.age}</td>

      <td>
        <span className="grade-badge">
          {student.grade}
        </span>
      </td>

      <td>{student.Parents_name}</td>

      <td>{student.contact_no}</td>

      <td>

        <div className="action-buttons">

          <button
            className="edit-btn"
            onClick={() => onEdit(student)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
};

export default StudentRow;