const express = require("express");
const authRouter = express.Router();
const User = require("../db/userAuthenticationQueries")

authRouter.post("/", User.findUserByImail);

module.exports = authRouter;