const { Schema, model } = require("mongoose");

var bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: [3, "minimum length of name is 3 character."],
      maxLength: [31, "maximum length of name is 31 character."],
    },

    email: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Please enter a valid email.",
      },
    },

    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minLength: [6, "minimum length of password is 6 character."],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    address: {
      type: String,
      required: [true, "address is required."],
    },

    phone: {
      type: String,
      required: [true, "phone is required."],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = model("users", userSchema);

module.exports = userModel;
