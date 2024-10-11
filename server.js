const express = require("express");
const app = express();
const morgan = require('morgan')

const PORT = process.env.PORT || 4001;

app.use(morgan('short'));

app.get('/', (req, res, next) => {
  res.status(200).send("Welcom to our simple ecomerce app");
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});