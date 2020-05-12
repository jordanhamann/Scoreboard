var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    moment = require("moment"),
    mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

//Database setup
mongoose.set('useUnifiedTopology', true); 
// mongoose.connect("mongodb://localhost/TitanConnectV1",{ useNewUrlParser: true });

//ROUTES
app.get("/", function(req, res){
    res.render("home");
});

app.get("/new", function(req, res){
    res.render("games/new");
});

app.listen(3000, function(){
    console.log("Scoreboard server is listening on port 3000");
});