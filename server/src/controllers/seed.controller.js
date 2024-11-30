const createError = require("http-errors");
const User = require("../models/user.model");
const data = require("../data");

const seedController = async (req, res, next) => {
  try {
    await User.deleteMany({});

    const users = await User.insertMany(data.users);

    res.status(201).json({
      message: "Seeding users are Created Successfully",
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedController };
