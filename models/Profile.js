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
    
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Profile = mongoose.model('Profile', userProfileSchema);

module.exports = Profile;
