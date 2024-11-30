const createError = require("http-errors");

const userModel = require("../models/user.model");

const findUserById = async (id, options = {}) => {
  try {
    const user = await userModel.findById(id).select("-password");
    if (!user)
      throw createError(404, "User Not found with this Id! Give Valid Id!");
    return user;
  } catch (error) {
    next(error);
  }
};

module.exports = findUserById;
