const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4001;
const morgan = require("morgan");
const db = require("./db/queries");

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

app.get("/products", db.getProducts);
app.get("/products/:id", db.getProductById);
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
