const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


app.use(cookieParser());




app.get("/", (req, res) => {

    let token = jwt.sign({ email: "ankit@gmail.com" }, "secret");
    res.cookie("token", token);

    res.send("cookie is set to ");
});

app.get("/read", (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
    res.send("Trying to read jwt");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});