const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post must belong to a user"],
    },
    post: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  }
  
  
  
  
  
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
