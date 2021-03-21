const express = require("express");
const router = express.Router();
const { signinValidator } = require("../validators/signinValidator");
const { signupValidator } = require("../validators/signupValidator");
const { runValidation } = require("../validators/index");
const {
  signup,
  signin,
  signout,
  requireSignin,
  secret,
} = require("../controllers/auth");

router.post("/signup", signupValidator, runValidation, signup);
router.post("/signin", signinValidator, runValidation, signin);
router.get("/signout", signout);
router.get("/secret", requireSignin, secret);

module.exports = router;
