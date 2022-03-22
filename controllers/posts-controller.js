const User = require("../models/User");
const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user exists with that ID", 404));
  }

  const newPost = await Post.create({
    user: req.user.id,
    post: req.body.post,
  });

  res.status(201).json({
    status: "success",
    data: {
      newPost,
    },
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  res.status(200).json({
    status: "success",
    data: {
      postsLength: posts.length,
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne(req.params.id);

  if (!post) {
    return next(new AppError("No post not found with specified id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.setActive = catchAsync(async (req, res, next) => {
  const active = req.body.isActive;
  const post = await Post.findByIdAndUpdate(req.params.id, { isActive: active });

  if (!post) {
    return next(new AppError("No post not found with specified id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post not found with specified id", 404));
  }

  await post.remove();

  res.status(204).json({
    status: "success",
    message: "Post removed",
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError("No post not found with specified id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.activatePost = catchAsync(async (req, res, next) => {
  
  await Post.findByIdAndUpdate(req.user.id, req.body);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
