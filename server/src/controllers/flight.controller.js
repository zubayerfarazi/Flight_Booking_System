const createError = require("http-errors");
const flightModel = require("../models/flights.model");
const { successResponse } = require("../helper/responseController");

const getAllFlights = async (req, res, next) => {
  try {
    const allFlightsInformation = await flightModel.find();
    if (!allFlightsInformation.length)
      throw createError(404, "Flights Information not found!");

    return successResponse(res, {
      statusCode: 200,
      message: "Flights information has been returned!",
      payload: { allFlightsInformation },
    });
  } catch (error) {
    next(error);
  }
};

const getFlightById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const flightInformation = await flightModel.findById(id);
    if (!flightInformation) throw createError(404, "Flight not found!");

    return successResponse(res, {
      statusCode: 200,
      message: "Flight information has been returned!",
      payload: { flightInformation },
    });
  } catch (error) {
    next(error);
  }
};

const searchFlight = async (req, res, next) => {
  try {
    const searchOrigin = req.query.origin || "";
    const searchDestination = req.query.destination || "";
    const searchDate = req.query.date ? new Date(req.query.date) : null;

    const page = req.query.page ? Math.max(1, Number(req.query.page)) : 1;
    const limit = req.query.limit ? Math.max(1, Number(req.query.limit)) : 10;

    // Create filter conditions
    const filter = {
      ...(searchOrigin && {
        origin: { $regex: new RegExp(searchOrigin, "i") },
      }),
      ...(searchDestination && {
        destination: { $regex: new RegExp(searchDestination, "i") },
      }),
      ...(searchDate && { date: searchDate }),
    };

    const searchFlights = await flightModel
      .find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    if (searchFlights.length === 0) throw createError(404, "No flights found!");

    const count = await flightModel.countDocuments(filter);

    return successResponse(res, {
      statusCode: 200,
      message: "Search Flight information successfully retrieved!",
      payload: {
        searchFlights,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addNewFlight = async (req, res, next) => {
  try {
    const flight = new flightModel(req.body);
    await flight.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Added New Flight information!",
      payload: { flight },
    });
  } catch (error) {
    next(error);
  }
};

const updateFlight = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedFlight = await flightModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedFlight) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Flight with ID ${id} has been updated successfully!`,
      payload: { updatedFlight },
    });
  } catch (error) {
    next(error);
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    const id = req.params.id;

    await flightModel.findByIdAndDelete(id);

    return successResponse(res, {
      statusCode: 200,
      message: "Flight has been deleted!",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFlights,
  getFlightById,
  searchFlight,
  addNewFlight,
  updateFlight,
  deleteFlight,
};
