const jwt = require("jsonwebtoken");

const generateJwtToken = (payload, privateKey, expiresIn) => {
  try {
    const token = jwt.sign(payload, privateKey, { expiresIn });
    return token;
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT Error: Invalid token signing process.", error.message);
      throw new Error("Failed to sign JWT: Invalid token or private key.");
    } else if (error instanceof jwt.TokenExpiredError) {
      console.error("JWT Error: Token expiration issue.", error.message);
      throw new Error("Failed to sign JWT: Token expired.");
    } else if (error instanceof jwt.NotBeforeError) {
      console.error("JWT Error: Token is not yet active.", error.message);
      throw new Error("Failed to sign JWT: Token not active yet.");
    }
    console.error("Failed to sign JWT: ", error.message);
    throw new Error("Failed to sign JWT.");
  }
};

module.exports = generateJwtToken;
