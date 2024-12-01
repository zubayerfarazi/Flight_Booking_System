import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Booking = () => {
  const { user } = useContext(UserContext);
  const { id: flightId } = useParams();
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  console.log(user);

  const handleBooking = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/bookings", {
        userId: user._id,
        flightId,
        numberOfSeats: seats,
        totalPrice: price,
      });

      if (localStorage.getItem("accessToken")) {
        setConfirmationMessage(
          `Booking confirmed! Booking ID: ${response.data.payload.booking._id}`
        );
      } else {
        alert("You have to login first");
      }
    } catch (error) {
      setConfirmationMessage(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Make a Booking
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Flight and User Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Flight ID
            </label>
            <input
              type="text"
              value={flightId}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={user.address}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              readOnly
            />
          </div>
        </div>

        {/* Right Column: Booking Details */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Number of Seats
            </label>
            <input
              type="number"
              placeholder="Enter number of seats"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Price per Seat
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full font-medium"
          >
            Confirm Booking
          </button>
          {confirmationMessage && (
            <p className="mt-4 text-green-600 text-lg font-semibold">
              {confirmationMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
