const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const secret = "mysecret";
const email = require("../utility/email");
// define secret key

module.exports.signup = async function(req, res) {
  // 1. create user
  const user = await userModel.create(req.body);
  // 2. payload
  const id = user["_id"];
  //jwt.sign
  const token = await jwt.sign({ id }, secret);

  res.cookie("jwt", token, { httpOnly: true });
// console.log(res.cookie);
  res.status(201).json({
    success: "User  Created ",
    user,
    token
  });
};

module.exports.login = async function(req, res) {
  // 1. create user
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const dbpassword = user.password;
      // console.log(user);
      // 2. payload
      const id = user["_id"];
      if (dbpassword == user.password) {
        const token = await jwt.sign({ id }, secret);

        res.cookie("jwt", token,{httpOnly:true} );
        // console.log(res.cookie);

        return res.status(201).json({
          success: "User  loggedIn",
          user,
          token
        });
      } else {
        return res.status(201).json({
          data: "please enter correct email or password"
        });
      }
    } else {
      res.status(201).json({
        data: "user not found"
      });
    }
    //jwt.sign
  } catch (err) {
    console.log(err);
  }
};
module.exports.logout = function(req, res) {
  // res.cookie()
  res.cookie("jwt", "d,kjbzsdkfbj", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 10)
  });
};

module.exports.isuserverified = async function(req, res, next) {
  // console.log(req.cookie);
const token=req.cookies?req.cookies.jwt:null||req.headers.authorization?req.headers.authorization.split(" ")[1]:null;

console.log(token);
  try {
    if (token) {
      const ans = await jwt.verify(`${token}`, secret);
      console.log(ans);
      if (ans) {
        const user = await userModel.findOne({ _id: ans.id });
        req.role = user.role;
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          data: "Something went wrong please login again"
        });
      }
    } else {
      return res.status(401).json({
        data: "User not logged in"
      });
    }
  } catch (err) {
    res.json({
      data: err
    });
  }
};

module.exports.isAuthorized = function(roles) {
  return function(req, res) {
    // console.log(roles);
    if (roles.includes(req.role)) {
      next();
    } else {
      res.status(401).json({
        data: "You are not authorized"
      });
    }
  };
  //1. Get  user
  // 2. User role
  // 3.role==admin
  // if(res.role==)
};
module.exports.updatePassword = function(req, res) {
  const user = req.user;
  if (req.body.password && req.body.newpassword && req.body.confirmpassword) {
    const prevPass = req.body.password;
    const newPass = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (user.password == prevPass) {
      user.password = newPass;
      user.confirmpassword = confirmpassword;
      user.save();
      return res.json({
        data: "password updated"
      });
    }
  } else {
    return res.json({
      data: "Please enter correct input"
    });
  }
};

// forget Password

// reset Password
// res.status(201).json({
//   data: req.headers
// });

module.exports.forgetPassword = async function(req, res) {
  //1.  findOne using email
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      // 2. add token property to that user

      const token = user.generateToken();

      await user.save({
        validateBeforeSave: false
      });
      const option = {to: user.email,
      subject : "forget password",
    text : token,
  html : `<h1> TOKEN</h1> <p> ${token} </p>`};

      await email(option);

      res.status(201).json({
        // token
        success: "Reset token has been send to your registered email id"
      });
    } else {
      res.json({
        data: "user with this email does not exist"
      });
    }
  } catch (err) {
    res.json({ data: err });
  }
  // 3. send token to the client
};
