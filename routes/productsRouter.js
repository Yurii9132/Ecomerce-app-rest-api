const express = require("express");
const productsRouter = express.Router();
const { getProducts, getProductById } = require("../db/productsQueries");

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);

module.exports = productsRouter;
