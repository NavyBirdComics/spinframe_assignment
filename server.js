//imports
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
//#const path = require('path');
//#const fs = require('fs');
mongoose = require('mongoose');
require("dotenv").config();
const carRoutes = require('./routes/carRouter');

//using express 
const app = express();

//using cors & body parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// connection to mongodb atlas via mongoose connect
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("DB connected");
}).catch(err=>{
  console.log("Database not connected"+err)
});

// allowing cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//use router
app.use('/',carRoutes);
  

app.listen(process.env.PORT || 8080,() => {
    console.log('server running');
});