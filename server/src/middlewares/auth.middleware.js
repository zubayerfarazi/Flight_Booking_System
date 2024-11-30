const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return next(createError(401, "Access token is not found!"));
    }

    // Verify token
    const decoded = jwt.verify(accessToken, jwtAccessKey);
    if (!decoded) {
      return next(
        createError(401, "Invalid Access Token. Please login again!")
      );
    }

    req.user = decoded.user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        createError(401, "Access token has expired. Please login again!")
      );
    }
    return next(createError(401, "Authentication failed. Please login again!"));
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if (decoded) {
          throw createError(400, "user is already logged in!");
        }
      } catch (error) {
        throw error;
      }
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw createError(403, "Forbidden! You must be an Admin to access this.");
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
