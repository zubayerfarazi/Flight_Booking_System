const express = require("express");
const {
  handleLogin,
  handleLogOut,
  handleRefreshToken,
  handleProtectedRouter,
} = require("../controllers/auth.controller");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/login", isLoggedOut, handleLogin); //isLoggedOut,
authRouter.post("/logout", isLoggedIn, handleLogOut); //isLoggedIn,
authRouter.get("/refresh-token", handleRefreshToken);
authRouter.get("/protected", handleProtectedRouter);

module.exports = authRouter;
