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
mongoose.connect("mongodb+srv://JordanHamann:4Given94@titan-connect-j-vbzvk.mongodb.net/scoreboardApp?retryWrites=true&w=majority",{ useNewUrlParser: true });

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
    var hostName = req.body.hostName;
    var gameTitle = req.body.gameTitle;
    var scoringMethod = req.body.scoringMethod;
    console.log(hostName);
    console.log(gameTitle);
    console.log(scoringMethod);

    var newGame = {gameTitle: gameTitle, roomCode: "AAAA"};

    Game.create(newGame, function(err, newlyCreatedGame){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreatedGame);
        }
    });

    res.render("games/new");
})


// ######################### Start App ##############################
app.listen(3000, function(){
    console.log("Scoreboard server is listening on port 3000");
});