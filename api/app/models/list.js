var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ItemSchema = require('./ItemSchema')

var ListSchema = new Schema({
  title: String,
  items: [ItemSchema],
  remainder: String,
  placeCoordinates: {
    lng: Number, lat: Number
  },
})

module.exports = mongoose.model('List', ListSchema)
