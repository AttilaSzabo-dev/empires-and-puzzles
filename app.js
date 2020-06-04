
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const randomId = require(__dirname + "/public/js/random.js");

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
let currentUser = "";


const heroeSchema = {
    name: String,
    picUrl: String,
    starsUrl: String,
    lvl: Number,
    ascend: String,
    class: String,
    star: String,
    id: String
};

const userSchema = {
    name: String,
    password: String,
    myHeroes: []
};

const Heroe = mongoose.model("Heroe", heroeSchema);

const User = mongoose.model("User", userSchema);

/* const heroe = new Heroe ({
    name: "Vivica(C)",
    picUrl: "images/5_holy/costume/vivica_c.jpg",
    starsUrl: "images/style/star5.png",
    lvl: 1,
    ascend: 1,
    class: "holy",
    star: "s5"
}); */

//heroe.save();


// Update one
/* Heroe.updateOne({ name: "Bauchan" }, { ascend: "images/style/asc1.png"}, function(err, res) {
    console.log(res.n);
}); */

//Update many
/* Heroe.updateMany({ lvl: 1 }, { ascend: "images/style/asc1.png"}, function(err, res) {
    console.log(res.n);
    console.log(err);
}); */



// Login page
app.get("/", function(req, res) {
    res.render("login");
})

app.post("/", function(req, res) {
    const userName = req.body.userName;
    const passW = req.body.passW;

    currentUser = req.body.userName;
    
    User.findOne({name: userName}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === passW) {
                    res.render("main", {navButtonName: myHeroesNav, checkGet: true, activeUser: userName, myHeroes: foundUser.myHeroes});
                } else {
                    console.log("Incorrect password");
                }
            } else {
                console.log("Incorrect User Name!");
            }
        }
    });
})

// Register page
app.get("/register", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    const userName = req.body.userName;
    const passW = req.body.passW;

    const user = new User ({
        name: userName,
        password: passW,
        myHeroes: []
    });
    
    user.save();

    res.redirect("/");
})


// Main page
 app.get("/main", function(req, res) {

    User.findOne({name: currentUser}, function(err, foundUser) {

        if (!err) {
            res.render("main", {navButtonName: myHeroesNav, checkGet: true, activeUser: currentUser, myHeroes: foundUser.myHeroes});
        }
    })
}) 

// Add/Edit heroe page
app.get("/add_edit", function(req, res) {

    Heroe.find({}, function(err, heroes) {

        if (!err) {
            
            User.findOne({name: currentUser}, function (err, foundUser) {
                res.render("add_edit", {navButtonName: addEditNav, checkGet: false, activeUser: currentUser, allHeroes: heroes, myHeroes: foundUser.myHeroes}); // Starting page route sending html
            });
        }
    })
})

// Alliance page
app.get("/alliance", function(req, res) {
    User.find({}, function(err, foundUser) {
        
        if (!err) {
            res.render("alliance", {navButtonName: myHeroesNav, checkGet: true, activeUser: currentUser, alliance: foundUser});
        }
    })
})

// post jQuery
app.post("/saveHero", function (req, res) {

    const picUrl = req.body.url;
    const heroLvl = req.body.lvl;
    const heroAsc = req.body.src;
    const selectDivide = req.body.divider;
    const actualHeroId = req.body.actualId;

    if (selectDivide === "true") {
    
        User.findOne({name: currentUser}, function(err, user) {

            if (!err) {
                
                User.update({ "name": currentUser, "myHeroes.id": actualHeroId}, {$set: {"myHeroes.$.lvl": heroLvl, "myHeroes.$.ascend": heroAsc}},function (err) {
                    if (!err) {
                        console.log("update success!!");
                        
                    }
                });
            }
        });
    }
    else {
        Heroe.findOne({picUrl: picUrl}, function (err, baseHeroe) {
            if (!err) {
                
                const heroe = new Heroe ({
                    name: baseHeroe.name,
                    picUrl: baseHeroe.picUrl,
                    starsUrl: baseHeroe.starsUrl,
                    lvl: heroLvl,
                    ascend: heroAsc,
                    class: baseHeroe.class,
                    star: baseHeroe.star,
                    id: "a" + randomId.getRandom()
                }); 
                
                User.findOneAndUpdate({ name: currentUser }, { $push: { myHeroes: heroe  } },function (err, user) {

                    if (err) {
                        console.log(err);
                    }
                });
            }
        }); 
    }
});

//Listen
app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})