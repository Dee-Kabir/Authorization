const { check } = require("express-validator");

exports.signinValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("A valid email address is required"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 to 15 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];
