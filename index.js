const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const login = require("./routes/login");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is Not Define!");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidly-app", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!..."))
  .catch(err => console.log("Faild to connect MongoDB! ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/login", login);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
