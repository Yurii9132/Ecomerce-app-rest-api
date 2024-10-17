const bcrypt = require("bcrypt");
const { query } = require("./index");
const AppError = require("../utils/AppError");

const findUserByImail = async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return next(new AppError("Missing required fields", 400));
  }

  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      throw new AppError("User not found", 404);
    }

    response.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { findUserByImail };
