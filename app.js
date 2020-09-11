const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Film = require("./models/film");
const Zanr = require("./models/zanr");
const app = express();

mongoose.connect("mongodb://localhost/rest", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to MOngoDB");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(bodyParser.json());

const film = require("./routes/filmovi");
const zanr = require("./routes/zanr");
app.use("/filmovi", film);
app.use("/zanr", zanr);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
