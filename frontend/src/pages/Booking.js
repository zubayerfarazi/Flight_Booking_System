import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Booking = () => {
  const { user } = useUser();
  const { id: flightId } = useParams();
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  console.log(user);

  const handleBooking = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/bookings", {
        userId: user.id,
        flightId,
        numberOfSeats: seats,
        totalPrice: price,
      });

      setConfirmationMessage(
        `Booking confirmed! Booking ID: ${response.data.payload.booking._id}`
      );
    } catch (error) {
      setConfirmationMessage(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Make a Booking</h1>
      <div>
        <input
          type="text"
          placeholder="Flight ID"
          value={flightId}
          className="border p-2 rounded mb-4"
          min="1"
          readOnly
        />
        <input
          type="number"
          placeholder="Enter no of Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="border p-2 rounded mb-4"
          min="1"
        />
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded mb-4"
          min="1"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
        {confirmationMessage && <p className="mt-4">{confirmationMessage}</p>}
      </div>
    </div>
  );
};

export default Booking;
