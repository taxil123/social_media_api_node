const mongoose = require("mongoose");

const User = require("../models/User");
const Friends = require("../models/Friends");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.sendFriendRequest = catchAsync(async (req, res, next) => {
  const userA = await User.findById(req.user.id);
  const recipientUser = req.body.recipient;
  const userB = await User.findById(recipientUser);
  if (!userA || !userB) {
    return next(new AppError("No user exists with that ID", 404));
  }

  const docA = await Friends.findOneAndUpdate(
    {
      requester: userA,
      recipient: userB,
    },
    {
      $set: { status: 1 },
    },
    {
      upsert: true,
      new: true,
    }
  );

  const docB = await Friends.findOneAndUpdate(
    {
      recipient: userA,
      requester: userB,
    },
    {
      $set: { status: 2 },
    },
    {
      upsert: true,
      new: true,
    }
  );

  const updateUserA = await User.findOneAndUpdate(
    { _id: userA },
    { $push: { friends: docA._id } }
  );

  const updateUserB = await User.findOneAndUpdate(
    { _id: userB },
    { $push: { friends: docB._id } }
  );

  res.status(200).json({
    status: "success",
    data: {
      updateUserA,
      updateUserB,
    },
  });
});


exports.acceptFriendRequest = catchAsync(async (req, res, next) => {
  const userA = await User.findById(req.user.id);
  const recipientUser = req.body.recipient;
  const userB = await User.findById(recipientUser);

  if (!userA || !userB) {
    return next(new AppError("No user exists with that ID", 404));
  }

  await Friends.findOneAndUpdate(
    { requester: userA, recipient: userB },
    { $set: { status: 3 } }
  );
  await Friends.findOneAndUpdate(
    { recipient: userA, requester: userB },
    { $set: { status: 3 } }
  );

  res.status(200).json({
    status: "success",
  });
});


exports.rejectFriendRequest = catchAsync(async (req, res, next) => {
  const userA = await User.findById(req.user.id);
  const recipientUser = req.body.recipient;
  const userB = await User.findById(recipientUser);

  if (!userA || !userB) {
    return next(new AppError("No user exists with that ID", 404));
  }

  const docA = await Friends.findOneAndRemove({
    requester: userA,
    recipient: userB,
  });

  const docB = await Friends.findOneAndRemove({
    recipient: userA,
    requester: userB,
  });

  const updateUserA = await User.findOneAndUpdate(
    { _id: userA },
    { $pull: { friends: docA._id } }
  );

  const updateUserB = await User.findOneAndUpdate(
    { _id: userA },
    { $pull: { friends: docB._id } }
  );

  res.status(204).json({
    status: "success",
    data: {
      updateUserA,
      updateUserB,
    },
  });
});


exports.checkFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const recipientUser = await User.findById(req.body.recipient);

  if (!user) {
    return next(new AppError("No user exists with that ID", 404));
  }

  await User.aggregate([
    {
      $lookup: {
        from: Friends.collection.name,
        let: { friends: "$friends" },
        pipeline: [
          {
            $match: {
              recipient: mongoose.Schema.ObjectId(recipientUser),
              $expr: { $in: ["$_id", "$$friends"] },
            },
          },
          {
            $project: { status: 1 },
          },
        ],
        as: "friends",
      },
    },
    {
      $addFields: {
        friendsStatus: {
          $ifNull: [{ $min: "$friends.status" }, 0],
        },
      },
    },
  ]);
  next();
});


exports.getAllFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("No user exists with that ID", 404));
  }

  const friendList = await User.findById(req.params.id).populate("friends");

  res.status(200).json({
    status: "success",
    data: {
      friendList,
    },
  });
});


exports.getFriend = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const friend = await User.findById(req.query.id);

  if (!user || !friend) {
    return next(new AppError("No user exists with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      friend,
    },
  });
});
