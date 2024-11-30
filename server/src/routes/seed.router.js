const express = require("express");
const { seedController } = require("../controllers/seed.controller");

const seedRouter = express.Router();

seedRouter.get("/seed-user", seedController);

module.exports = seedRouter;
