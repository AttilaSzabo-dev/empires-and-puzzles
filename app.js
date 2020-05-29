
const express = require("express");
const bodyParser = require("body-parser");


app = express();

app.use(express.static('public')); //static files location
app.set("view engine", "ejs"); // ejs files location
app.use(bodyParser.urlencoded({ extended: true }));

const addEditNav = "Add/Edit My Heroes";
const myHeroesNav = "My Heroes";

const allHeroes = [
    {
        heroeName: "Azar",
        heroePicPath: "images/1_red/three_star/azar.jpg",
    },
    {
        heroeName: "Bauchan",
        heroePicPath: "images/1_red/three_star/bauchan.jpg",
    },
    {
        heroeName: "Ei Dunn",
        heroePicPath: "images/1_red/three_star/ei_dunn.jpg",
    },
    {
        heroeName: "Hawkmoon",
        heroePicPath: "images/1_red/three_star/hawkmoon.jpg",
    },
];

// Login page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/sign_in.html"); // Starting page route sending html
})

app.post("/", function(req, res) {
    const userName = req.body.userName;
    const passW = req.body.passW;
    //console.log(userName + " " + passW);
    if (userName === "1" && passW === "1") {
        res.redirect("/main");
    }
})

// Main page
app.get("/main", function(req, res) {
    res.render("main", {navButtonName: myHeroesNav, checkGet: true}); // Starting page route sending html
})

// Add heroe page
app.get("/add_edit", function(req, res) {
    res.render("add_edit", {navButtonName: addEditNav, checkGet: false}); // Starting page route sending html
})

app.post("/test", function (req, res) {
    res.send("Válasz");
    console.log(req.body.name);
})

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})