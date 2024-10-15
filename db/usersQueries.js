const bcrypt = require("bcrypt");
const { query } = require("./index");
const AppError = require("../utils/AppError");

const getUsers = async (request, response, next) => {
  try {
    const result = await query("SELECT * FROM users ORDER BY ID ASC");
    if (result.rows.length === 0) {
      throw new AppError("No user found", 404);
    }

    response.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (request, response, next) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      throw new AppError("User not found", 404);
    }

    response.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createUser = async (request, response, next) => {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return next(new AppError("Missing required fields", 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    response.status(201).json({
      message: `User added with ID: ${result.rows[0].id}`,
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  const id = parseInt(request.params.id);
  const { username, email, password } = request.body;

  if (isNaN(id)) {
    return next(new AppError("Invalid user ID", 400));
  }

  if (!username || !email || !password) {
    return next(new AppError("Missing required fields", 400));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [username, email, hashedPassword, id]
    );

    if (result.rowCount === 0) {
      throw new AppError("User not found", 404);
    }

    response.status(200).json({
      message: `User modified with ID: ${id}`,
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    const result = await query("DELETE FROM users WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      throw new AppError("User not found", 404);
    }

    response.status(200).json({
      message: `User deleted with ID: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
