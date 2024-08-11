const express = require('express');
const http = require('http');
const logger = require('morgan');
const app = express();
const fs = require("fs");
const cors = require("cors")
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const server = http.createServer(app);


// const AuthRoute  = require("./routes/auth")
// const MainRoute  = require("./routes/main")
const RetailerRoute  = require("./routes/Retailer")

require('dotenv').config()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.sqlite');
mongoose.connect(
    // process.env.DB_LINK 
    // ||
    'mongodb://localhost:27017/project_one'
    , {useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(error)
    console.log(error)
    else
    console.log("DB Connected")
});

app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(logger("dev"))
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 



// app.use("/auth", AuthRoute)
app.use("/retail", RetailerRoute)

app.get("/", (req, res)=>{
    const data = []
    
    
})

module.exports = server.listen(port, ()=> console.log("Server are running"))