import React from "react";

const FlightList = ({ flights }) => {
  if (!flights.length) return <p>No flights found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {flights.map((flight) => (
        <div key={flight._id} className="border p-4 rounded shadow-md">
          <h2 className="text-lg font-bold">{flight.airline}</h2>
          <p>Flight: {flight.flightNumber}</p>
          <p>From: {flight.origin}</p>
          <p>To: {flight.destination}</p>
          <p>Date: {new Date(flight.date).toLocaleDateString()}</p>
          <p>Price: ${flight.price}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
