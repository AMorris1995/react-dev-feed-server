const bcrypt = require("bcrypt");
const User = require("../models/user-model");

exports.postRegister = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;
  try {
    if (!fName | !lName | !email | !password) {
      throw { statusCode: 400, message: "Please input all fields" };
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        firstName: fName,
        lastName: lName,
        email,
        password: hashedPassword,
        userData: {
          reputationPoints: 0,
          favouritePosts: [],
          toolbox: [],
          profileImageURL:
            "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
          coverImageURL:
            "https://images.unsplash.com/photo-1587502538004-e9ec84b491c4?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        },
      });
      await newUser.save();
      res.status(200).json("User created!");
    } else {
      throw { statusCode: 400, message: "This account already exists!" };
    }
  } catch (err) {
    next(err);
  }
};

exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    if (!email || !password) {
      throw { statusCode: 400, message: "Please fill in all fields!" };
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      throw { statusCode: 400, message: "No user found with this email" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw { statusCode: 400, message: "Invalid username or password" };
    }

    const userObj = user.toObject();

    delete userObj.password;

    res.status(200).json({ user: userObj });
  } catch (err) {
    next(err);
  }
};
