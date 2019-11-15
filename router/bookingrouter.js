const express = require("express");
const bookingrouter = express.Router();
const {checkout} = require("../controller/bookingcontroller");
bookingrouter.route("/checkout").post(checkout);
module.exports = bookingrouter;