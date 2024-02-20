const express = require("express");
const { products, users } = require("./dummy.json");

const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const fs = require("fs");
const { error } = require("console");

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

app.get("/read-new-user", (req, res) => {
  fs.readFile("dummyTest.json", (error, data) => {
    if (error) {
      console.log("Error in reading");
    } else {
      console.log("Data from file", JSON.parse(data.toString()));
      res.status(200);
      res.send(data);
    }
  });
});

app.post("/add-user", (req, res) => {
  const newUser = req.body;

  fs.readFile("dummy.json", (error, data) => {
    console.log(data);
    if (error) {
      console.log("Error in reading file");
    } else {
      const jsonFile = JSON.parse(data.toString());
      jsonFile.users.push(newUser);
      fs.writeFile("dummy.json", JSON.stringify(jsonFile), (err) => {
        if (err) {
          console.log(err);
          res.send("error happened");
        } else {
          console.log("success");
          res.send("User added successfully");
        }
      });
    }
  });
  res.status(200);
  res.send("User added successfully");
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
