
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app = express();

app.use(express.static('public')); //static files location
app.set("view engine", "ejs"); // ejs files location
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-bruce:Q838_cs3Xf.iaGa@brucecluster-v5uof.mongodb.net/empiresPuzzlesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const addEditNav = "Add/Edit My Heroes";
const myHeroesNav = "My Heroes";

const heroeSchema = {
    name: String,
    picUrl: String,
    starsUrl: String,
    lvl: Number,
    ascend: Number,
    class: String,
    star: String
};

const Heroe = mongoose.model("Heroe", heroeSchema);

const heroe = new Heroe ({
    name: "Squire Wabbit",
    picUrl: "images/1_fire/three_star/squire_wabbit.jpg",
    starsUrl: "images/style/star3.png",
    lvl: 1,
    ascend: 1,
    class: "fire",
    star: "s3"
});

//heroe.save();



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

    Heroe.find({}, function(err, heroes) {

        if (!err) {
            res.render("main", {navButtonName: myHeroesNav, checkGet: true, heroes: heroes}); // Starting page route sending html
        }
    })
})

// Add/Edit heroe page
app.get("/add_edit", function(req, res) {

    Heroe.find({}, function(err, heroes) {

        if (!err) {
            res.render("add_edit", {navButtonName: addEditNav, checkGet: false, heroes: heroes}); // Starting page route sending html
        }
    })
})

// Test jQuery
app.post("/test", function (req, res) {
   /*  res.send("Válasz");
    console.log(req.body.name); */
})

//Listen
app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})