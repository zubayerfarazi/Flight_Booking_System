const express = require("express");
const {
  addNewBooking,
  getAllBooking,
  getBookingById,
  updateBookingInfo,
  deleteBooking,
} = require("../controllers/booking.controller");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middleware");

const bookingRouter = express.Router();

bookingRouter.post("/bookings", isLoggedIn, addNewBooking);
bookingRouter.get("/bookings", isLoggedIn, isAdmin, getAllBooking); //isLoggedIn, isAdmin,
bookingRouter.get("/bookings/user/:id", isLoggedIn, getBookingById); //isLoggedIn,
bookingRouter.put("/bookings/:id", isLoggedIn, isAdmin, updateBookingInfo); //isLoggedIn, isAdmin,
bookingRouter.delete("/bookings/:id", isLoggedIn, isAdmin, deleteBooking); //isLoggedIn, isAdmin,

module.exports = bookingRouter;
