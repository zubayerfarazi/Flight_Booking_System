import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(
      //   "http://localhost:4000/api/login",
      //   {
      //     email,
      //     password,
      //   },
      //   { withCredentials: true }
      // );
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", response.data.payload.accessToken);
      alert("Logged in successfully!");

      // setUser(response.data.payload.user);
      setUser(response.data.payload.user);
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmail}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
          required
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
          required
        />
        <button
          type="submit"
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        >
          Signin
        </button>
      </form>
    </div>
  );
};

export default Login;
