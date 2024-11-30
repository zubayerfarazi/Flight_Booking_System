const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  processRegister,
  verifyUser,
  updateUserById,
  handleForgetUpdatePassword,
  handleUpdatePassword,
  handleForgetPassword,
} = require("../controllers/user.controller");
const {
  isAdmin,
  isLoggedIn,
  isLoggedOut,
} = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.get("/get-users", isLoggedIn, isAdmin, getAllUsers); //isLoggedIn, isAdmin,
userRouter.get("/user/:id([0-9a-fA-f]{24})", isLoggedIn, getUserById); //isLoggedIn,
userRouter.put("/user/:id([0-9a-fA-f]{24})", updateUserById);
userRouter.delete("/user/:id([0-9a-fA-f]{24})", deleteUserById);

userRouter.post("/process-register", processRegister); //isLoggedOut
userRouter.get("/verify/:token", verifyUser); //isLoggedOut, post

userRouter.put("/forget-update-password", handleForgetUpdatePassword);
userRouter.put("/update-password/:id([0-9a-fA-f]{24})", handleUpdatePassword);
userRouter.post("/reset-password", handleForgetPassword);

module.exports = userRouter;
