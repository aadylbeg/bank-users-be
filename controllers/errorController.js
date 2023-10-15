const AppError = require("../utils/appError");

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${err.errors[0].message}`;
  return new AppError(message, 400);
};

const handleSequelizeDatabaseError = (err) => {
  const message = err.parent;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error;
  if (err.name === "SequelizeValidationError")
    error = handleValidationErrorDB(err);
  // if (err.name === "SequelizeDatabaseError")
  //   error = handleSequelizeDatabaseError(err);

  console.log(error || err);
  sendError(error || err, res);
};
