const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 32,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._passsword = password;
    this.salt = uuidv1;
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._passsword;
  });

userSchema.methods = {
  authenticate: function (plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
