var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ItemSchema = require('./ItemSchema')

module.exports =  new Schema({
  title: String,
  items: [ItemSchema],
  remainder: String,
  placeCoordinates: {
    lat: Number,
    lng: Number
  },
})
