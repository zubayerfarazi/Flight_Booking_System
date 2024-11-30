import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditFlightPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    price: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/flights/${id}`
        );
        const flight = response.data;

        // Ensure the date is converted to a valid format for input
        setFlightData({
          ...flight,
          date: flight.date
            ? new Date(flight.date).toISOString().split("T")[0]
            : "",
          time: flight.time || "",
        });
      } catch (error) {
        console.error("Error fetching flight data:", error);
        alert("Failed to fetch flight data.");
      }
    };
    fetchFlight();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleUpdateFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/flights/${id}`, flightData);
      alert("Flight updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating flight:", error);
      alert("Failed to update flight.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Flight</h2>
      <form onSubmit={handleUpdateFlight} className="space-y-4">
        <div>
          <label className="block text-lg">Flight Number:</label>
          <input
            type="text"
            name="flightNumber"
            value={flightData.flightNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Airline:</label>
          <input
            type="text"
            name="airline"
            value={flightData.airline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Origin:</label>
          <input
            type="text"
            name="origin"
            value={flightData.origin}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Destination:</label>
          <input
            type="text"
            name="destination"
            value={flightData.destination}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Date:</label>
          <input
            type="date"
            name="date"
            value={flightData.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Time:</label>
          <input
            type="time"
            name="time"
            value={flightData.time}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Price:</label>
          <input
            type="number"
            name="price"
            value={flightData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Available Seats:</label>
          <input
            type="number"
            name="availableSeats"
            value={flightData.availableSeats}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Flight
        </button>
      </form>
    </div>
  );
};

export default EditFlightPage;
