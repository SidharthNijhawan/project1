const express = require("express");
// const pug = require("pug");
//
const cookieParser = require("cookie-parser");
//setup express app
// let app = express()
//ddos
const  rateLimit = require("express-rate-limit");
//query injection
const mongoSanitize = require("express-mongo-sanitize");
//parameter pollution
const hpp = require("hpp");

const app = express();
app.use(cookieParser());
const userRouter = require("./router/userRouter");
const planRouter = require("./router/planRouter");
const viewRouter = require("./router/viewRouter");
const bookingrouter =require("./router/bookingrouter");
// Middleware

app.use(express.urlencoded({extended: true}));
app.use(mongoSanitize());
app.use(hpp());

//  to serve static files
app.use(express.static("public"));
// to express to not to ignore icoming json data from body
app.use(express.json());
// Sub Apps
// app.use(function(req, res, next) {
//   console.log(req.cookies);
//   next();});

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 1000,
    message: "access is denied"
});
app.use(limiter);
// Routes
//templating engine=> handlebar,EJS ,pug
app.set("view engine", "pug");
// template folder
app.set("views", "view");
// app.get("/", function(req, res) {
//   res.status(200).render("home.pug");
// });
// app.get("/plan", function(req, res) {
//   res.status(200).render("plan.pug");
// });
// /plans
app.use("/api/user", userRouter);
app.use("/api/plan", planRouter);
app.use("/", viewRouter);
app.use("/api/booking",bookingrouter);
// app.use("", function(req, res) {
//   res.status(200).json({
//     Result: "Response from api"
//   });
// });
module.exports = app;
