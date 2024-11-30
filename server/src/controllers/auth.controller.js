const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
const generateJwtToken = require("../helper/jsonwebtoken");
const { successResponse } = require("../helper/responseController");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw createError(404, "Account not found. Please register.");
    }

    // password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createError(401, "Incorrect email or password.");
    }

    // user is banned
    if (user.isBanned) {
      throw createError(403, "Your account is banned. Please contact support.");
    }

    // Generate JWT and set cookies
    const accessToken = generateJwtToken({ user }, jwtAccessKey, "10m");

    res.cookie("access_token", accessToken, {
      maxAge: 10 * 60 * 1000, // 10 minutes
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Generate JWT and set cookies
    const refreshToken = generateJwtToken({ user }, jwtRefreshKey, "10d");

    res.cookie("refresh_token", refreshToken, {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully.",
      payload: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return successResponse(res, {
      statusCode: 200,
      message: "user logout successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refresh_token;

    const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
    if (!decodedToken)
      throw createError(404, "Invalid refresh token. Please Login again!");

    // Generate JWT and set cookies
    const accessToken = generateJwtToken(
      decodedToken.user,
      jwtAccessKey,
      "10m"
    );

    res.cookie("access_token", accessToken, {
      maxAge: 10 * 60 * 1000, // 10 minutes
      // httpOnly: false,
      // secure: false,
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "New access token generated!",
      payload: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRouter = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    const decodedToken = jwt.verify(accessToken, jwtAccessKey);
    if (!decodedToken)
      throw createError(404, "Invalid Access Token. Please login first!");

    return successResponse(res, {
      statusCode: 200,
      message: "Protected resources accessed success",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogOut,
  handleRefreshToken,
  handleProtectedRouter,
};
