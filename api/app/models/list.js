var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  title: String,
  placeCoords: {
    lng: Number, lat: Number
  },
  remainder: {type: Date, default: Date.now}
})

module.exports = mongoose.model('List', ListSchema);
