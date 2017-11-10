var mongoose     = require('mongoose')
var Schema       = mongoose.Schema
var ListSchema = require('./ListSchema')

var UserSchema   = new Schema({
	name: String,
  lists:[ListSchema]
})

module.exports = mongoose.model('User', UserSchema)
