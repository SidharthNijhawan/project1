const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkInput
} = require("../controller/userController");
let {
  signup,
  isuserverified,
  isAuthorized,
  updatePassword,login,forgetPassword,logout
} = require("../controller/authController");

// /api/user=>
// post => user create => name
// Chaining

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/updateuser").post(isuserverified,updateUser);
userRouter.route("/updatepassword").patch(isuserverified,updatePassword);
userRouter.route("/forgetpassword").patch(forgetPassword);
userRouter.route("/logout").get(logout);


userRouter
  .route("/")
  .get(isuserverified, isAuthorized(["admin"]), getAllUser)
  .post(checkInput, createUser);
// /api/user/myuser
// userRouter.route("/myuser").get(getMyuser);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
