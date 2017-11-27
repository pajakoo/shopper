var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

var UserSchema   = new Schema({
  fbId: String,
	name: String,
	email: String,
  token: String,
  friends:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  shared:[{ type: Schema.Types.ObjectId, ref: 'List' }],
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]

})

module.exports = mongoose.model('User', UserSchema)

/*

{
  "_id" : ObjectId("5a09ab238affaa50eb225fb3"),
  "name" : "Krasi Georgiev",
  "lists" : [],
  "__v" : 0
}

{
  "_id" : ObjectId("5a09b4a93627995940cdb678"),
  "name" : "Gusin B Georgus",
  "lists" : [],
  "__v" : 0
}

*/
