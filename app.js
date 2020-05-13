var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    moment = require("moment"),
    mongoose = require("mongoose");

//Mongoose Models from module.export
var User = require("./models/user");
var Game = require("./models/game");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

//Database setup
mongoose.set('useUnifiedTopology', true); 
// mongoose.connect("mongodb://localhost/TitanConnectV1",{ useNewUrlParser: true });

// ##########################  ROUTES  ##########################################

// Landing Page
app.get("/", function(req, res){
    res.render("home");
});

// New Game Form
app.get("/games/new", function(req, res){
    res.render("games/new");
});

app.post("/games/new", function(req, res){
    var hostName = req.body.
})


// ######################### Start App ##############################
app.listen(3000, function(){
    console.log("Scoreboard server is listening on port 3000");
});