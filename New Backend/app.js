const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
    res.send("Hello Mongo Db");
});

app.get("/create", async (req, res) => {
    let createduser = await userModel.create({
        name: "harsh",
        email: "harsh@gmail.com",
        username: "harsh123"
    });
    res.send(createduser);
});

app.get("/update", async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({ username: "ankit12" }, { username: "ankit1355 " }, { new: true });
    res.send(updatedUser);
});

app.get("/read", async (req, res) => {
    let allusers = await userModel.find();
    res.send(allusers);
});

app.get("/delete", async (req, res) => {
    let deleteduser = await userModel.findOneAndDelete({ username: "harsh123" });
    res.send(deleteduser);
});
app.listen(3000, (req, res) => {
    console.log("Server listening on 3000");
});