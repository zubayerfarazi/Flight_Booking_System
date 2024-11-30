const mongoose = require("mongoose");
const { mongooseUrl } = require("../../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongooseUrl, options);
    console.log("Database is connected successfully");

    mongoose.connection.on("error", () => {
      console.error("DB Connection error", error);
    });
  } catch (error) {
    console.log("DB is not connected", error.toString());
  }
};

module.exports = connectDB;
