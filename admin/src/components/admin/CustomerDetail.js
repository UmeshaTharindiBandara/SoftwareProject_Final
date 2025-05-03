import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CustomerDetail.css";

function CustomerDetail() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/signup")
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

  // Handle role change in dropdown
  const handleRoleSelect = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].selectedRole = newRole; // Store selected role separately
    setUsers(updatedUsers);
  };

  // Update user role
  const handleRoleUpdate = (index) => {
    const user = users[index];

    if (!user || !user._id) {
      console.error("User ID is undefined! Cannot update role.");
      Swal.fire("Error!", "User ID is missing!", "error");
      return;
    }

    // Use selectedRole if it exists, otherwise use current role
    const newRole = user.selectedRole || user.role;

    axios
      .put(`http://localhost:5000/api/signup/${user._id}`, { role: newRole })
      .then((res) => {
        // Update users state
        const updatedUsers = [...users];
        updatedUsers[index].role = res.data.user.role;
        delete updatedUsers[index].selectedRole; // Clean up
        setUsers(updatedUsers);

        // Show success message
        Swal.fire(
          "Success!",
          `Role updated to ${res.data.user.role} successfully!`,
          "success"
        );
      })
      .catch((err) => {
        console.error("Full error object:", err);
        console.error("Error response:", err.response?.data);

        Swal.fire(
          "Error!",
          err.response?.data?.message || "Failed to update role. Try again.",
          "error"
        );
      });
  };

  return (
    <div className="container1">
      <h2>Customer Details</h2>
      <table className="user-table">
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
                    value={user.selectedRole || user.role}
                    onChange={(e) => handleRoleSelect(index, e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    className="update-btn"
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
