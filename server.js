require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./db/index");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("short"));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET_KEY, //"yourSecretKey"
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
);

app.get("/", (req, res, next) => {
  if (req.session.views) {
    req.session.views++;
    res.json(`You visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.json("Welcome to the site");
  }
});

const usersRouter = require("./routes/usersRouter");
app.use("/users", usersRouter);

const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
