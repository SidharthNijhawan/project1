const planModel = require("../model/planModel");
module.exports.getHomePage = async function(req, res) {
  let plans = await planModel.find();
  plans = plans.slice(0, 3);
  res.status(200).render("home.pug", {//
    plans: plans,
    pageName: "Home Page"
  });
};

module.exports.getPlansPage = async function(req, res) {
  let plans = await planModel.find();
  // get All plans
  res
    .status(200)
    .render("planPage.pug", { plans: plans, pageName: "Plan Page" });
};
module.exports.getLoginPage = async function(req, res) {
  res.status(200).render("login.pug");
};
module.exports.getSignupPage = async function(req, res) {
  res.status(200).render("signup.pug");
};

module.exports.getProfilePage = function(req, res) {
  const user = req.user;
  res.status(200).render("me.pug", { user });
};
module.exports.getupdatepasswordpage = async function(req,res){
  res.status(200).render("updatepassword.pug");
}
module.exports.getupdateuserpage = async function(req,res){
  res.status(200).render("updateuser.pug");
}
module.exports.getforgetpasswordpage = async function(req,res){
  res.status(200).render("forgetpassword.pug");
}