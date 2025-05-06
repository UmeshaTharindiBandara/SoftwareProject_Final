import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

import "./CustomerDetail.css";

function CustomerDetail() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://10.50.227.117:5000/api/user_signup")
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setUsers(
            res.data.data.map((user) => ({
              ...user,
              _id: user._id || user.id,
              originalRole: user.role,
            }))
          );
        } else {
          console.error("Invalid API response:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleRoleSelect = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].selectedRole = newRole;
    setUsers(updatedUsers);
  };

  const handleRoleUpdate = (index) => {
    const user = users[index];

    if (!user || !user._id) {
      Swal.fire("Error!", "User ID is missing!", "error");
      return;
    }

    axios
      .put(`http://10.50.227.117:5000/api/user_signup/${user._id}`)
      .then((res) => {
        const updatedUsers = [...users];
        updatedUsers[index].role = res.data.user.role;
        delete updatedUsers[index].selectedRole;
        setUsers(updatedUsers);

        Swal.fire(
          "Success!",
          `Role updated to ${res.data.user.role} successfully!`,
          "success"
        );
      })
      .catch((err) => {
        Swal.fire(
          "Error!",
          err.response?.data?.message || "Failed to update role. Try again.",
          "error"
        );
      });
  };

  return (
    <div className="customer-detail-container">
      <Button
        variant="outlined"
        onClick={() => navigate("/admin")}
        className="back-button"
        startIcon={<ArrowBackIcon />}
        style={{ marginLeft: "800px" }}
      >
        Back to Dashboard
      </Button>
      <h2 className="customer-title">Customer Details</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="role-select"
                    value={user.selectedRole || user.role}
                    onChange={(e) => handleRoleSelect(index, e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    className="role-update-btn"
                    onClick={() => handleRoleUpdate(index)}
                    disabled={(user.selectedRole || user.role) === user.role}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerDetail;
