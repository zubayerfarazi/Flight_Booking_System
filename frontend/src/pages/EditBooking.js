import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedBooking, setUpdatedBooking] = useState({
    customerName: "",
    flightId: "",
    seatsBooked: "",
    date: "",
  });

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/bookings/user/${bookingId}`
        );
        const data = response.data.payload.allBookingsInformation;
        setBooking(data); // Set booking data
        setUpdatedBooking({
          customerName: data.customerName || "",
          flightId: data.flightId || "",
          seatsBooked: data.seatsBooked || "",
          date: data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchBooking();
  }, [bookingId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking({ ...updatedBooking, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/api/bookings/${bookingId}`,
        updatedBooking
      );
      alert("Booking updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl mb-6">Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={updatedBooking.customerName}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Flight ID</label>
          <input
            type="text"
            name="flightId"
            value={updatedBooking.flightId}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Seats Booked</label>
          <input
            type="number"
            name="seatsBooked"
            value={updatedBooking.seatsBooked}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Date</label>
          <input
            type="date"
            name="date"
            value={updatedBooking.date}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default EditBooking;
