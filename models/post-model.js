const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postData: {
      postContent: {
        type: String,
        required: true,
      },
      postComments: {
        type: [mongoose.Types.ObjectId],
        ref: "Comment",
        required: true,
      },
      favourites: {
        type: [mongoose.Types.ObjectId],
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
