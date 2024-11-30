const express = require("express");
const {
  getAllFlights,
  getFlightById,
  searchFlight,
  addNewFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flight.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

const flightRouter = express.Router();

flightRouter.get("/flights", getAllFlights);
flightRouter.get("/flights/:id([0-9a-fA-f]{24})", getFlightById);
flightRouter.get("/flights/search", searchFlight);
flightRouter.post("/flights", isAdmin, addNewFlight); //isAdmin,
flightRouter.put("/flights/:id([0-9a-fA-f]{24})", isAdmin, updateFlight); //isAdmin,
flightRouter.delete("/flights/:id", isAdmin, deleteFlight);

module.exports = flightRouter;
