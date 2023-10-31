/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (uuid) => {
    await axios.delete(`http://localhost:5000/users/${uuid}`);
    getUser();
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to={"/users/add"} className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((users, index) => (
            <tr key={users.uuid}>
              <td>{index + 1}</td>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>{users.role}</td>
              <td>
                <Link
                  to={`/users/edit/${users.uuid}`}
                  className="button is-small mr-1 is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(users.uuid)}
                  className="button is-small is-danger"
                >
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

export default UserList;
