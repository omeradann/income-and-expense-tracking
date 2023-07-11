const bcrypt = require("bcrypt");
var createError = require("http-errors");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const autMiddleware = require("../middleware/autMiddleware");

const listUser = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const user = await User.signIn(req.body.email, req.body.password);
    const {token,refreshToken} = await user.generateToken();
    res.send({
      user,
      token,
      refreshToken
    });
    console.log("success!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const addedUser = await new User(req.body);
    const newEmail = addedUser.email;

    const person = await User.findOne({ email: newEmail })
    if (person) {
      throw createError(400, "Mail in use!");
    } else {
      const {token,refreshToken} = await addedUser.generateToken();
      addedUser.password = await bcrypt.hash(addedUser.password,8);
      const user = await addedUser.save();
      res.json({user,token,refreshToken});
    }
  } catch (error) {
    next(error);
  }};

const deleteUser = async (req, res, next) => {
  try {
    const result = await User.deleteMany({ isAdmin: false });
    if (result) {
      return res.json({
        message: "All users except administrators have been deleted!",
      });
    } else {
      throw createError(400, "users could not be deleted!");
    }
  } catch (error) {
    next(createError(400, "Batch delete error!"));
  }
};

const userLogout = async (req, res) => {
try {
  const token = req.header('refresh-token')
  const id = await jwt.verify(token,'secretkey')

  delete req.headers.authorization
  console.log(id);
  res.json("exit successful")
} catch (error) {
  res.json("error")
}
};

module.exports = {
  listUser,
  userLogin,
  addUser,
  deleteUser,
  userLogout
};
