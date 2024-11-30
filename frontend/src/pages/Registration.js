import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/process-register",
        { name, email, password, address, phone }
      );
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={handleName}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmail}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        />
        <br />
        <input
          type="address"
          placeholder="Address"
          onChange={handleAddress}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        />
        <br />
        <input
          type="phone"
          placeholder="Phone"
          onChange={handlePhone}
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        />
        <br />
        <button
          type="submit"
          className="mt-1 p-5 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-2xl font-semibold text-gray-600 focus:ring-1"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
