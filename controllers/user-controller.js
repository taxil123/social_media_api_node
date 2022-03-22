const sharp = require("sharp");

const User = require("../models/User");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user exists with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  
  if (!user) {
    return next(new AppError("No user exists with that ID", 404));
  }

  
  if (!req.body.name || !req.body.email) {
    next(new AppError("This route is for updating user name and email", 400));
  }

  const filteredBody = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});


exports.createUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("User does not exists by that ID", 404));
  }

  const { bio, status, city } = req.body;
  const { school, university, degree } = req.body.education;
  const { twitter, youtube, linkedin, instagram } = req.body.social;

  const profile = await Profile.create({
    user,
    bio,
    twitter,
    youtube,
    linkedin,
    instagram,
    status,
    city,
  });

  if (school || university || degree) {
    const educationObj = { school, university, degree };
    profile.education.unshift(educationObj);
  }

  await profile.save();

  res.status(201).json({
    status: "success",
    data: {
      profile,
    },
  });
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User Profile does not exists", 404));
  }
  const posts = await Post.findById(req.params.id);
  const userProfile = await User.findById(req.params.id).populate("profile");

  res.status(200).json({
    status: "success",
    data: {
      userProfile,
      posts,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const userProfile = await Profile.findById(req.params.id);

  if (!userProfile) {
    return next(new AppError("No user profile exists", 404));
  }

  
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update. Please use /updateMyPassword",
        400
      )
    );
  }

  
  
  const filteredBody = filterObj(
    req.body,
    "bio",
    "education",
    "social",
    "status",
    "city"
  );

  
  if (req.file) {
    filteredBody.avatar = req.file.filename;
  }

  const updatedUserProfile = await Profile.findByIdAndUpdate(
    userProfile.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      userProfile: updatedUserProfile,
    },
  });
});



