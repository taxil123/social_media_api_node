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
  }
  //   {
  //     //Each time the data is outputted as JSON/Object then virtuals will be true
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true },
  //   }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
