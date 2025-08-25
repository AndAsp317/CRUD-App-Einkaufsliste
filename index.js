console.log("Server startet...");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let items = [];

app.get("/", (req, res) => {
  console.log("Anfrage an / erhalten");
  res.render("index", { items });
});

app.post("/add", (req, res) => {
  const text = req.body.item?.trim();
  if (text) {
    items.push(text);
  }
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index) && index >= 0 && index < items.length) {
    items.splice(index, 1);
  }
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= items.length) {
    return res.redirect("/");
  }
  res.render("edit", { index, text: items[index] });
});

app.post("/edit/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const text = req.body.item?.trim();
  if (!isNaN(index) && index >= 0 && index < items.length && text) {
    items[index] = text;
  }
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
