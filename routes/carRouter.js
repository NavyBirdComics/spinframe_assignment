const express = require('express'); //requires express
const carRoutes = express.Router(); //sets carRoutes as router 
const carModel = require('../models/carModel'); //requires mongoose model from models folder
const cors = require("cors");
const path = require('path');

carRoutes.use(express.static(path.join(__dirname, '..', 'build')));
carRoutes.use(cors()); //uses cors

//homepage
carRoutes.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });


//get all cars
//uses find with empty filter to find all cars from db
//sends them in response if not error, if error sends error
carRoutes.get('/getallcars', function(req, res) {
    console.log("GET all cars")

    carModel.find({}, function (err, cars) {
        if (!err) {
            res.json(cars);
        }
        else {
            res.send("Couldn't get cars; ", err)
        }
    })
});

//get car by license plate
//gets license number from url params
//uses findOne with license as filter to find the correct car
//sends car in response if not error and car exists, if error sends error
carRoutes.get('/getcarbylicense/:license', function(req, res) {
    console.log("GET car by license")
    let license = req.params.license;

    let filter = {license:license}

    carModel.findOne(filter, function (err, car) {
        if (!err) {
            if (car)
            res.json(car);
            else
            res.send("No car with this license plate # exists");
        }
        else {
            res.send("Couldn't get car; ", err)
        }
    })
});

//add car to db
//add car gets car details (license, color, manufacturer, year) from body
//finds if car with the license number already exists using findone with filter on license,
//if does, sends appropriate message
//if doesn't, creates a new car object and saves it to db
carRoutes.post('/addcar', function(req, res) {
    console.log("POST add car")
    if(req.body.license) var license = req.body.license;
    else var license = ""; 
    if(req.body.color) var color = req.body.color;
    else var color = ""; 
    if(req.body.manufacturer) var manufacturer = req.body.manufacturer;
    else var manufacturer = ""; 
    if(req.body.year) var year = req.body.year;
    else var year = ""; 

    let filter = {license:license}

    carModel.findOne(filter, function (err, car) {
        if (!err) {
            if (car)
            res.send("A car with this license plate # already exists");
            else
            {
                let newCar = new carModel({license:license,color:color,manufacturer:manufacturer,year:year});
                newCar.save(function(err,ncar) {
                if(!err){
                    res.json(ncar)
                    }
                    else {
                    res.send("Couldn't add car;", err);
                    }
                })
            }
        }
        else {
            res.send("Couldn't get car; ", err)
        }
    })
});

//update car
//update car gets car details (license, color, manufacturer, year) from body
//as well as original license plate number
//finds if original car exists using findone with filter on license, if it does,
//finds if car with the new license number already exists using findone with filter on license,
//if does, sends appropriate message
//if doesn't, uses findoneandupdate with original license plate # as filter and car details as update query
carRoutes.post('/updatecar', function(req, res) {
    console.log("POST update car")
    if(req.body.license) var license = req.body.license;
    else var license = ""; 
    if(req.body.color) var color = req.body.color;
    else var color = ""; 
    if(req.body.manufacturer) var manufacturer = req.body.manufacturer;
    else var manufacturer = ""; 
    if(req.body.year) var year = req.body.year;
    else var year = ""; 

    if(req.body.oglicense) var oglicense = req.body.oglicense;
    else var oglicense = ""; 

    let ogfilter = {license:oglicense}
    let filter = {license:license}

    carModel.findOne(ogfilter, function (err, car) {
        if (!err) {
            if (!car)
            res.send("A car with original license plate # doesn't exist");
            else
            {
                carModel.findOne(filter, function (err, car) {
                    if (!err) {
                        if (oglicense != license && car)
                        res.send("A car with this license plate # already exists");
                        else
                        {
                            let updateQuery = { $set:{license:license,color:color,manufacturer:manufacturer,year:year}};
                            carModel.findOneAndUpdate(ogfilter,updateQuery,{new: true}, function(err,ncar) {
                                if(!err){
                                res.json(ncar);
                                }
                                else {
                                res.send("Couldn't update car;", err);
                                }
                            })
                        }
                    }
                    else {
                        res.send("Couldn't get car; ", err)
                    }
                })
            }
        }
        else {
            res.send("Couldn't get car; ", err)
        }
    })
});

//delete car
//delete car gets car license from body
//deletes the car using findoneanddelete
carRoutes.post('/deletecar', function(req, res) {
    console.log("POST delete car")
    if(req.body.license) var license = req.body.license;

    let filter = {license:license}

    carModel.findOneAndDelete(filter,function(err) {
        if(!err){ 
            // Sending 1 if the deletion succeeded and 0 if it didn't.
            res.send("1");
        }
        else {
            res.send("0")
        }
   });
});

//export router
module.exports = carRoutes;