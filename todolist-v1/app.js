const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let worksItems = [];
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs");


app.get("/", function (req, res) {

  let day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items });
})

app.post("/", function (req, res) {

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    worksItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: worksItems });
})

app.get("/about", function (req, res) {
  res.render("about")
})

app.listen(3000, function (req, res) {
  console.log("Server is running on 3000 port");
})