const { Users } = require("../models");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { phone } = req.query;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  var where = {},
    offset = (page - 1) * limit;

  if (phone) where.phone = phone;

  const users = await Users.findAll({ where, limit, offset });
  return res.status(200).send(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({ where: { phone: req.params.phone } });
  if (!user) return next(new AppError("Not Found", 404));

  return res.status(200).send(user);
});

exports.createUser = catchAsync(async (req, res, next) => {
  var { username, email, password, phone } = req.body;
  console.log(req.body);
  const user = await Users.findOne({ where: { username } });
  if (user) return next(new AppError("username is not valid", 400));

  if (password) password = await bcrypt.hash(password, 12);
  const newUser = await Users.create({ username, email, password, phone });

  return res.status(201).send(newUser);
});
