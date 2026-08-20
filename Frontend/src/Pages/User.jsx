import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user", {
        auth: {
          username: localStorage.getItem("userName"),
          password: localStorage.getItem("password"),
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`, {
        auth: {
          username: localStorage.getItem("userName"),
          password: localStorage.getItem("password"),
        },
      });

      // Remove deleted user from UI
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;