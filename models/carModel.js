let mongoose = require('mongoose'); // requires mongodb

// creates new schema for cars
const car_schema = new mongoose.Schema({
    license:{type:String, required:true},
    color:{type:String, required:true},
    manufacturer:{type:String, required:true},
    year:{type:Number, required:true}
}, {collection:'cars'});

// creates mongoose model for cars from schema
const car_model = mongoose.model('car_model',car_schema);

// exports model
module.exports = car_model;