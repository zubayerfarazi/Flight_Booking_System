import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminDashboard = () => {
  const { user } = useUser();
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("addFlight"); // Default tab

  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    airline: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    price: "",
    availableSeats: "",
  });

  // Fetch flights and bookings data from the server
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/flights");
        setFlights(response.data.payload.allFlightsInformation);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/bookings");
        setBookings(response.data.payload.allBookingsInformation);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchFlights();
    fetchBookings();
  }, []);

  const handleDeleteFlight = async (flightId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      try {
        await axios.delete(`http://localhost:4000/api/flights/${flightId}`);
        alert("Flight deleted successfully!");
        setFlights(flights.filter((flight) => flight._id !== flightId));
      } catch (error) {
        console.error("Error deleting flight:", error);
        alert("Failed to delete flight.");
      }
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:4000/api/bookings/${bookingId}`);
        alert("Booking deleted successfully!");
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Failed to delete booking.");
      }
    }
  };

  // Handle input change for the new flight form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight({ ...newFlight, [name]: value });
  };

  // Handle adding a new flight
  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/flights",
        newFlight
      );
      setFlights([...flights, response.data]);
      setNewFlight({
        flightNumber: "",
        airline: "",
        origin: "",
        destination: "",
        date: "",
        time: "",
        price: "",
        availableSeats: "",
      });
      alert("Flight added successfully!");
    } catch (error) {
      console.error("Error adding flight:", error);
      alert("Failed to add flight. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar for switching tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded-md ${
            selectedTab === "allFlights"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("allFlights")}
        >
          All Flights
        </button>

        <button
          className={`py-2 px-4 rounded-md ${
            selectedTab === "addFlight"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("addFlight")}
        >
          Add Flights
        </button>

        <button
          className={`py-2 px-4 rounded-md ${
            selectedTab === "bookings"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("bookings")}
        >
          Bookings
        </button>
      </div>

      {/* Content for all flights information */}
      {selectedTab === "allFlights" && (
        <div>
          <h2 className="text-xl mt-6">All Flights</h2>
          <div className="flex flex-wrap gap-6">
            {Array.isArray(flights) && flights.length > 0 ? (
              flights.map((flight) => (
                <div
                  key={flight._id}
                  className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-2xl">
                      {flight.airline} - {flight.flightNumber}
                    </h3>
                    <p className="text-xl">
                      {flight.origin} to {flight.destination}
                    </p>
                    <p className="text-lg">
                      {new Date(flight.date).toLocaleDateString()} -{" "}
                      {flight.time}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/admin/flights/edit/${flight._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteFlight(flight._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center">No Flights Available</div>
            )}
          </div>
        </div>
      )}

      {/* Content for Add Flights Tab */}
      {selectedTab === "addFlight" && (
        <div>
          <h2 className="text-xl mb-4">Add New Flight</h2>
          <form onSubmit={handleAddFlight} className="mb-6">
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={newFlight.flightNumber}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Airline</label>
              <input
                type="text"
                name="airline"
                value={newFlight.airline}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Origin</label>
              <input
                type="text"
                name="origin"
                value={newFlight.origin}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Destination</label>
              <input
                type="text"
                name="destination"
                value={newFlight.destination}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Date</label>
              <input
                type="date"
                name="date"
                value={newFlight.date}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Time</label>
              <input
                type="time"
                name="time"
                value={newFlight.time}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={newFlight.price}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-sm">Available Seats</label>
              <input
                type="number"
                name="availableSeats"
                value={newFlight.availableSeats}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Add Flight
            </button>
          </form>
        </div>
      )}

      {/* Content for Bookings Tab */}
      {selectedTab === "bookings" && (
        <div>
          <h2 className="text-xl mt-6">Bookings</h2>
          <div className=" bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <h3 className="text-lg font-bold">Customer Information</h3>
            <div className="flex flex-wrap gap-6">
              <p>
                <strong>Name:</strong> {user?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {user?.address || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone || "N/A"}
              </p>
              <div className="">
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking._id} className="">
                      <h3 className="text-lg font-bold">
                        Booking ID: {booking._id}
                      </h3>
                      <p>
                        <strong>Flight:</strong> {booking.flightId}
                      </p>
                      <p>
                        <strong>Customer Name:</strong> {booking.customerName}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Seats Booked:</strong> {booking.seatsBooked}
                      </p>

                      {/* Edit button - Redirect to edit page */}
                      <div className="flex justify-between mt-4">
                        <Link
                          to={`/admin/bookings/edit/${booking._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center">
                    No Bookings Available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
