/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Layout from "../../layouts/Main";
import UserList from "../../contents/users/UserList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../auth/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default Users;
