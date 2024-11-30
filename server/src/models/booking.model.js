const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  flightId: {
    type: Schema.Types.ObjectId,
    ref: "flight",
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["Confirmed", "Cancelled"],
    default: "Confirmed",
  },
});

const bookingModel = model("booking", bookingSchema);

module.exports = bookingModel;
