const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            console.log("Error reading files:", err);
            return res.status(500).send("Error reading files");
        }
        res.render("index", { files: files });
    });
});

app.get("/file/:filename", (req, res) => {
    const filepath = path.join(__dirname, "files", req.params.filename);

    fs.readFile(filepath, "utf-8", (err, filedata) => {
        if (err) {
            console.log("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        res.render("show", { filename: req.params.filename, filedata: filedata });
    });
});


app.get("/edit/:filename", (req, res) => {
    res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {

    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => {
        if (err) throw err;
        res.redirect("/");
    });

});





app.post("/create", (req, res) => {
    const filename = `${req.body.title.split(' ').join('')}.txt`;
    const filepath = path.join(__dirname, "files", filename);
    fs.writeFile(filepath, req.body.details, (err) => {
        if (err) {
            console.log("Error writing file:", err);
            return res.status(500).send("Error writing file");
        }
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
