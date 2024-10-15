const bcrypt = require("bcrypt");
const { query } = require("./index");

const getProducts = (request, response, next) => {
  query("SELECT * FROM products", (error, result) => {
    if (error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(200).json(result.rows);
  });
};

const getProductById = (request, response, next) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).json({ error: "Invalid product ID" });
  }

  query("SELECT * FROM products WHERE id = $1", [id], (error, result) => {
    if (error) {
      return response.status(400).json({ error: error.message });
    }

    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Product not found" });
    }

    return response.status(200).json(result.rows[0]);
  });
};

module.exports = {
  getProducts,
  getProductById,
};
