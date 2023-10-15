const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
const { createSendToken } = require("../utils/createSendToken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  let token,
    auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) token = auth.split(" ")[1];
  if (!token) return next(new AppError("You are not logged in", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await Users.findOne({
    where: { uuid: decoded.id },
  });
  if (!freshUser) return next(new AppError("User no longer exists", 401));

  req.user = freshUser;
  next();
});

exports.isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.type != "admin") return next(new AppError("Not Allowed", 403));
  next();
});

exports.signup = catchAsync(async (req, res, next) => {
  var { username, email, password, phone } = req.body;

  const user = await Users.findOne({ where: { username, type: "admin" } });
  if (user) return next(new AppError("username is not valid", 400));

  if (password) password = await bcrypt.hash(password, 12);
  const newUser = await Users.create({ username, email, password, phone });

  createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next(new AppError("Provide username and password", 400));

  const user = await Users.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("Incorrect username or password", 401));

  createSendToken(user, 200, res);
});
