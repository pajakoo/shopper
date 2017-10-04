var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ItemSchema = new Schema({ name: String, qty:Number, price:Number })

var ListSchema = new Schema({
  title: String,
  items: [ItemSchema],
  placeCoords: {
    lng: Number, lat: Number
  },
  remainder: Number //{type: Date, default: Date.now}
})

module.exports = mongoose.model('List', ListSchema)
