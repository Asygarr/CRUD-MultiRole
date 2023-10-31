/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [role, setRole] = useState("");
  const [massage, setMassage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPass(response.data.password);
        setConfPass(response.data.password);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMassage(error.response.data.massage);
        }
      }
    };
    getUserById();
  }, [id]);

  const editUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        password: pass,
        confirmPassword: confPass,
        role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMassage(error.response.data.massage);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>

      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={editUser}>
              <p className="has-text-centered">{massage}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="*****"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                    placeholder="*****"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
