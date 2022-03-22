const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      default: 'Bio',
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    //Each time the data is outputted as JSON/Object then virtuals will be true
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Profile = mongoose.model('Profile', userProfileSchema);

module.exports = Profile;
