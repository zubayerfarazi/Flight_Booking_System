import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";

const FlightDetails = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/flights/${id}`
      );
      setFlight(response.data.payload.flightInformation);
    };
    fetchFlightDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <Link to={`/flights`} className="flex items-center gap-2 font-semibold">
        <IoArrowBack /> Back
      </Link>
      {flight ? (
        <div>
          <h1 className="text-3xl mb-4">
            {flight.airline} - {flight.flightNumber}
          </h1>
          <p className="text-xl">
            {flight.origin} to {flight.destination}
          </p>
          <p className="text-lg">
            {flight.date} - {flight.time}
          </p>
          <p>Duration: {flight.duration}</p>
          <p>Price: ${flight.price}</p>
          <p>Available Seats: {flight.availableSeats}</p>
          <Link
            to={`/bookings/${id}`}
            className="hover:text-blue-700 bg-blue-500 text-lg text-white p-2 rounded-lg"
            flightId={id}
          >
            Book
          </Link>
        </div>
      ) : (
        <p>Loading flight details...</p>
      )}
    </div>
  );
};

export default FlightDetails;
