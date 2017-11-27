var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ItemSchema = require('./ItemSchema')

var ListSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [ItemSchema],
  remainder: String,
  placeCoordinates: {
    lat: Number,
    lng: Number
  },
})

module.exports = mongoose.model('List', ListSchema)
