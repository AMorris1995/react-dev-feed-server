const Post = require("../models/post-model");
exports.newPost = async (req, res, next) => {
  const { userID, content } = req.body;

  try {
    if (!userID | !content) {
      throw { statusCode: 400, message: "Something went wrong" };
    }

    const newPost = new Post({
      author: userID,
      postData: {
        postContent: content,
        postComments: [],
        favourites: [],
      },
    });

    await newPost.save();
    const populated = await newPost.populate("author").execPopulate();

    const postObj = populated.toObject();
    delete postObj.author.email;
    res.status(200).json({ post: postObj });
  } catch (err) {
    next(err);
  }
};

exports.fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author");

    if (!posts) {
      throw { statusCode: 400, message: "No posts found" };
    }

    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const { postID } = req.body;

  try {
    await Post.findByIdAndDelete(postID);
    res.status(200).json({ postID });
  } catch (error) {
    console.log(error);
  }
};
