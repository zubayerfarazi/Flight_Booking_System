import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Flight Booking System
      </h1>
      <p className="text-lg mb-4">
        Our system allows users to search, book, and manage flight bookings
        easily and efficiently.
      </p>
      <ul className="text-left">
        <li>🔍 Search for flights by origin, destination, and date.</li>
        <li>✈️ View available flights in real-time.</li>
        <li>📋 Manage bookings seamlessly.</li>
      </ul>
      <p className="text-lg mt-6">
        Click "Search" in the navigation bar to find flights.
      </p>
    </div>
  );
};

export default Home;
