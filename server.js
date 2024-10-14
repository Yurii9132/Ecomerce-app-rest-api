const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4001;
const morgan = require("morgan");
const db = require("./db/productsQueries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("short"));

app.get("/", (req, res, next) => {
  res.status(200).send("Welcom to our simple ecomerce app");
});

const usersRouter = require('./db/usersRouter');
app.use('/users', usersRouter);

const productsRouter = require('./db/productsRouter');
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
