const { errorHandler } = require("../helpers/dbErrorHandler");
const User = require("../models/user");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { email, password, name } = req.body;
  User.findOne({ email }, (error, data) => {
    if (data) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }
    let user = new User(req.body);
    user.save((error, newuser) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      }
      res.json({
        message: "Account created successfully now you can signin",
      });
    });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Invalid Email or password",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Invalid Email or password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.jwt_string, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, name, email } = user;
    res.json({
      token,
      user: { _id, name, email },
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.jwt_string,
  algorithms: ["HS256"],
});

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signed out successfully",
  });
};

exports.secret = (req, res) => {
  return res.json({
    message: "This is a secret for logged in user only",
  });
};
