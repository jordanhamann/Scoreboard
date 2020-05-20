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

// Join Game Form
app.get("/join", function(req, res){
    res.render("join");
});

app.post("/join", function(req, res){
    var roomCode = req.body.roomCode;
    var name = req.body.name;
    User.create({username: name}, function(err, createdUser){
        if(err){
            console.log(err)
        } else {
            Game.findOne({roomCode: req.body.roomCode}).populate("players").exec(function(err, foundGame){
                if(err){
                    console.log(err)
                } else {
                    foundGame.players.push(createdUser);
                    foundGame.save().then(res.render("games/waitingRoom", {game: foundGame}));
                    
                }
            })
        }
    })

});

app.post("/games/new", function(req, res){
    var hostName = req.body.hostName;
    var gameTitle = req.body.gameTitle;
    var scoringMethod = req.body.scoringMethod;
    console.log(hostName);
    console.log(gameTitle);
    console.log(scoringMethod);

    roomCode = generateRoomCode();

    var newGame = {gameTitle: gameTitle, roomCode: roomCode, scoringMethod: scoringMethod};

    User.create({username: hostName, isHost: true}, function(err, createdUser){
        if(err){
            console.log(err)
        } else {
            Game.create(newGame, function(err, newlyCreatedGame){
                if(err){
                    console.log(err);
                } else {
                    console.log(newlyCreatedGame);
                    newlyCreatedGame.players.push(createdUser);
                    newlyCreatedGame.save();
                    res.render("games/index", {game: newlyCreatedGame});
                }
            });
        }
    })

})


// ######################### Start App ##############################
app.listen(3000, function(){
    console.log("Scoreboard server is listening on port 3000");
});


// ######################## Functions ################################
function generateRoomCode(){
    var roomcode = "";
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for(var i=0; i<4; i++){
        roomcode = roomcode + letters[Math.floor(Math.random()*letters.length)];
    }
    return roomcode;
}