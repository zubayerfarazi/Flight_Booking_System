const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const findUserById = require("../helper/findById.helper");
const { jwtSecretKey, clientUrl, jwtResetPasswordKey } = require("../secret");
const sendEmailWithNodeMail = require("../helper/email");
const { successResponse } = require("../helper/responseController");
const generateJwtToken = require("../helper/jsonwebtoken");
const userModel = require("../models/user.model");

const getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 3);

    // Escaping any special regex characters in `search`
    const searchRegularExpression = new RegExp(
      ".*" + search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*",
      "i"
    );

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegularExpression } },
        { email: { $regex: searchRegularExpression } },
        { phone: { $regex: searchRegularExpression } },
      ],
    };

    const allUsers = await userModel
      .find(filter)
      .select("-password")
      .limit(limit)
      .skip((page - 1) * limit);

    if (!allUsers) throw createError(404, "No users are found!");

    const count = await userModel.countDocuments(filter);

    return successResponse(res, {
      statusCode: 200,
      message: "All Users information successfully retrieved!",
      payload: {
        allUsers,
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

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findUserById(id);

    return successResponse(res, {
      statusCode: 200,
      message: `User with ${id} has been returned!`,
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Find user by ID and update with new data
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return successResponse(res, {
      statusCode: 200,
      message: `User with ID ${id} has been updated successfully!`,
      payload: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findUserById(id);

    await userModel.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: `User with ${id} has been Deleted!`,
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const userExists = await userModel.exists({ email: email });
    if (userExists) throw createError(409, "User is exists with this email");

    const newUserInformation = { name, email, password, address, phone };

    //create jwt
    const token = generateJwtToken(newUserInformation, jwtSecretKey, "10m");

    //prepare email
    const emailData = {
      email,
      subject: "Complete Your Registration - Activation Required",
      html: `
      <h2>Hello ${name}</h2>
      <h3>Welcome to the email for registering your account!</h3>
      <p>Please click the link to <a href="http://localhost:4000/api/verify/${token}" target='blank'>activate your account!</a> </p>
      `,
    };

    //send email
    try {
      sendEmailWithNodeMail(emailData);
    } catch (error) {
      next(createError(500, "Failed to send Email"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to you ${email} to complete your account verification!`,
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) throw createError(404, "Token not found!");

    const decode = jwt.verify(token, jwtSecretKey);
    if (!decode) throw createError(404, "user not found!");

    const userExits = await userModel.exists({ email: decode.email });
    if (userExits)
      throw createError(409, "user is already exists with this email!");

    const user = await userModel.create(decode);
    res.redirect("http://localhost:3000/login");

    return successResponse(res, {
      statusCode: 200,
      message: `User is Registered successfully!`,
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdatePassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    const id = req.params.id;

    const user = await userModel.findOne({ email: email });
    if (!user) throw createError(409, "user not found!");

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) throw createError(401, "Password does not match!");

    // newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      throw createError(400, "New password and confirm password do not match!");
    }

    // Find user by ID and update with new data
    const updatedUser = await userModel
      .findByIdAndUpdate(
        user._id,
        { password: newPassword },
        { new: true, runValidators: true }
      )
      .select("-password");

    return successResponse(res, {
      statusCode: 200,
      message: `User with ID ${id} has been updated successfully!`,
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user)
      throw createError(404, "Email does not exist. Please Login first!");

    const token = generateJwtToken({ email }, jwtResetPasswordKey, "10m");

    //prepare email
    const emailData = {
      email,
      subject: "Reset Password Email",
      html: `
      <h2>Hello ${user.name}</h2>
      <h3>Welcome to the email to reset your password!</h3>
      <p>Please click the link to <a href="${clientUrl}/api/v1/users/reset-password/${token}" target='blank'>activate your account!</a> </p>
      `,
    };

    //send email
    try {
      sendEmailWithNodeMail(emailData);
    } catch (error) {
      next(createError(500, "Failed to send Email"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to you ${email} to complete your account verification!`,
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetUpdatePassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, jwtResetPasswordKey);

    if (!decoded) throw createError(404, "Sorry!");

    const updatedData = await userModel.findOneAndUpdate(
      { email: decoded.email },
      { $set: { password } },
      { new: true, runValidators: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: `User with ID has been updated successfully!`,
      payload: { updatedData },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  processRegister,
  verifyUser,
  updateUserById,
  handleUpdatePassword,
  handleForgetPassword,
  handleForgetUpdatePassword,
};
