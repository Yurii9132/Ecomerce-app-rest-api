const { query } = require("./index");
const AppError = require("../utils/AppError");

const getProducts = async (request, response, next) => {
  try {
    const result = await query("SELECT * FROM products ORDER BY price DESC");

    if (result.rows.length === 0) {
      throw new AppError("No product found", 404);
    }

    response.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (request, response, next) => {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return next(new AppError("Invalid product ID", 400));
  }

  try {
    const result = await query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      throw new AppError("Product not found", 404);
    }

    response.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }

};

module.exports = {
  getProducts,
  getProductById,
};
