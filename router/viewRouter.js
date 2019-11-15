const express = require("express");
const {
  getHomePage,
  getPlansPage,
  getLoginPage,
  getProfilePage,
  getSignupPage,getforgetpasswordpage
} = require("../controller/viewController");
const { isuserverified } = require("../controller/authController");
const viewRouter = express.Router();
viewRouter.route("").get(getHomePage);
viewRouter.route("/plan").get(getPlansPage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter
    .route("/me")
    .get(isuserverified, getProfilePage);
viewRouter.route("/forgetpassword").get(getforgetpasswordpage);

// viewRouter.route("/me").get(protectRoute, getProfilePage);
module.exports = viewRouter;
