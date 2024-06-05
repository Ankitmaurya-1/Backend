
const express = require('express');
const app = express();


app.get('/', (req, res) => {

    res.send("Hello World it's done");
});
app.get('/read', (req, res) => {

    res.send("Hello World it's a read page");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});