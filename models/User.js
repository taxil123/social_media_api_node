const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
      trim: true,
      validate: [validator.isAlpha, "Provide a valid name"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please enter your email address"],
      trim: true,
      validate: [validator.isEmail, "Provide a valid email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "A user must have a password"],
      maxlength: 15,
      minlength: 8,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friends",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  }
  
  
  
  
  
);








userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidate, user) {
  return await bcrypt.compare(candidate, user);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 100,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
