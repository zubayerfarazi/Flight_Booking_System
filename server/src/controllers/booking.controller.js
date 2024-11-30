const createError = require("http-errors");

const bookingModel = require("../models/booking.model");
const { successResponse } = require("../helper/responseController");

const addNewBooking = async (req, res, next) => {
  try {
    const { flightId, numberOfSeats, totalPrice } = req.body;
    const userId = req.user._id;

    const booking = new bookingModel({
      userId,
      flightId,
      numberOfSeats,
      totalPrice,
    });
    await booking.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Added New Booking!",
      payload: { booking },
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooking = async (req, res, next) => {
  try {
    const allBookingsInformation = await bookingModel.find();
    if (!allBookingsInformation.length)
      throw createError(404, "Booking Information not found!");

    return successResponse(res, {
      statusCode: 200,
      message: "Booking information has been returned!",
      payload: { allBookingsInformation },
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const bookingInformation = await bookingModel.findById(id);
    if (!bookingInformation) throw createError(404, "Booking not found!");

    return successResponse(res, {
      statusCode: 200,
      message: "Booking information has been returned!",
      payload: { bookingInformation },
    });
  } catch (error) {
    next(error);
  }
};

const updateBookingInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedBooking = await bookingModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Booking with ID ${id} has been updated successfully!`,
      payload: { updatedBooking },
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const id = req.params.id;

    await bookingModel.findByIdAndDelete(id);

    return successResponse(res, {
      statusCode: 200,
      message: "Booking has been deleted!",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewBooking,
  getAllBooking,
  getBookingById,
  updateBookingInfo,
  deleteBooking,
};
