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
        },
      });
      await newUser.save();
      res.status(200).send("User created!");
    } else {
      throw { statusCode: 400, message: "This account already exists!" };
    }
  } catch (err) {
    next(err);
  }
};

exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email | !password) {
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
