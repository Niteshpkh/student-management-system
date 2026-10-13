import React, { useEffect, useState } from "react";
import "./User.css";
import api from "../../api/axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUsername = localStorage.getItem("userName");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      // Cookies with JWT are automatically sent by the configured api instance
      const response = await api.get("/user");

      // MongoDB/Spring might return a plain array or a paged object
      const userList = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.users)
        ? response.data.users
        : [];

      setUsers(userList);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch user list. Please check your admin privileges.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id, targetUsername) => {
    if (targetUsername === currentUsername) {
      alert("You cannot delete your own logged-in admin account.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete user "${targetUsername}"?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/user/${id}`);

      // Filter by either id or _id
      setUsers((prevUsers) =>
        prevUsers.filter((u) => (u.id || u._id) !== id)
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <div className="user-page-container">
      <div className="user-header">
        <h2>User Management</h2>
        <button className="refresh-btn" onClick={fetchUsers} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && users.length === 0 ? (
        <p className="loading-text">Loading users...</p>
      ) : (
        <div className="table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-cell">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const userId = user.id || user._id;
                  const isSelf = user.userName === currentUsername;

                  return (
                    <tr key={userId}>
                      <td>{user.userName}</td>
                      <td>
                        <span className={`role-badge role-${(user.role || "").toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className={`delete-btn ${isSelf ? "disabled" : ""}`}
                          onClick={() => deleteUser(userId, user.userName)}
                          disabled={isSelf}
                          title={isSelf ? "Cannot delete yourself" : "Delete user"}
                        >
                          {isSelf ? "Current User" : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;