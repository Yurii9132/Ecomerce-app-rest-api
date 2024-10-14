const bcrypt = require("bcrypt");
const query = require("./index");

const getUsers = (request, response, next) => {
  query("SELECT * FROM users ORDER BY ID ASC", (error, result) => {
    if (error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(200).json(result.rows);
  });
};

const getUserById = (request, response, next) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).json({ error: "Invalid user ID" });
  }

  query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      return response.status(400).json({ error: error.message });
    }

    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Product not found" });
    }

    return response.status(200).json(result.rows[0]);
  });
};

const createUser = async (request, response, next) => {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword],
      (error, result) => {
        if (error) {
          return response.status(400).json({ error: error.message });
        }
        return response.status(201).json({
          message: `User added with ID: ${result.rows[0].id}`,
          user: result.rows[0],
        });
      }
    );
  } catch (err) {
    return response.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (request, response, next) => {
  const id = parseInt(request.params.id);
  const { username, email, password } = request.body;

  if (isNaN(id)) {
    return response.status(400).json({ error: "Invalid user ID" });
  }

  if (!username || !email || !password) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [username, email, hashedPassword, id],
      (error, result) => {
        if (error) {
          return response.status(400).json({ error: error.message });
        }

        if (result.rowCount === 0) {
          return response.status(404).json({ error: "User not found" });
        }

        return response.status(200).json({
          message: `User modified with ID: ${id}`,
          user: result.rows[0],
        });
      }
    );
  } catch (err) {
    return response.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = (request, response, next) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).json({ error: "Invalid user ID" });
  }

  query("DELETE FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      return response.status(400).json({ error: message });
    }

    if (result.rowCount === 0) {
      return response.status(404).json({ error: "User not found" });
    }

    return response
      .status(200)
      .json({ message: `User deleted with ID: ${id}` });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
