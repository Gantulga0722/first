const express = require("express");
const { products, users } = require("./dummy.json");
const app = express();

app.get("/products", (req, res) => {
  res.type = "application/json";
  res.send({ products: products });
});
app.get("/users", (req, res) => {
  res.type = "application/json";
  res.send({ users: users });
});
app.get("/usernames", (req, res) => {
  res.type = "application/json";
  res.send({ username: users.map((user) => user.name) });
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
