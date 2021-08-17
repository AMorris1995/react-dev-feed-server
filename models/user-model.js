const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      select: false,
      type: String,
      required: true,
    },
    userData: {
      reputationPoints: {
        type: Number,
        required: true,
      },
      favouritePosts: {
        type: Array,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
