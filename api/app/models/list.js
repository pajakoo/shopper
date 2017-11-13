var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ItemSchema = require('./ItemSchema')
var User = require('./user')

var ListSchema = new Schema({
  title: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  shared:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  items: [ItemSchema],
  remainder: String,
  placeCoordinates: {
    lat: Number,
    lng: Number
  },
})

module.exports = mongoose.model('List', ListSchema)
