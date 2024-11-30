import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Flights = () => {
  const [flights, setFlights] = useState([]);

  const fetchAllFlights = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/flights");
      setFlights(response.data.payload.allFlightsInformation);
    } catch (error) {
      console.error("Error fetching all flights:", error);
    }
  };

  useEffect(() => {
    fetchAllFlights();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">All Flights</h1>
      <div className="flex justify-between flex-wrap gap-y-4">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div
              key={flight._id}
              className="p-4 bg-blue-200 shadow-lg rounded-lg"
            >
              <h3 className="text-2xl">
                {flight.airline} - {flight.flightNumber}
              </h3>
              <p className="text-xl">
                {flight.origin} to {flight.destination}
              </p>
              <p className="text-lg">
                {new Date(flight.date).toLocaleDateString()} - {flight.time}
              </p>
              <div className="flex items-center justify-around pt-4">
                <Link
                  to={`/flights/${flight._id}`}
                  className="hover:text-blue-700 bg-blue-500 text-lg text-white p-2 rounded-lg"
                >
                  View Details
                </Link>
                <Link
                  to={`/bookings/${flight._id}`}
                  className="hover:text-blue-700 bg-blue-500 text-lg text-white p-2 rounded-lg"
                >
                  Book
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
