const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
    res.send("Hello Mongo Db");
});

app.listen(3000, () => {
    console.log("Server is Running on Port || 3000");
});