const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs");

var today = new Date();

app.get("/", function (req, res) {

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  var day = today.toLocaleDateString("en-US", options)
  res.render("list", { day: day, newListItems: items });
})

app.post("/", function (req, res) {
  var item = req.body.newItem;

  items.push(item);

  res.redirect("/");
})

app.listen(3000, function (req, res) {
  console.log("Server is running on 3000 port");
})