/* eslint-disable no-console */
// BASE SETUP
// =============================================================================
/**
 *
 *https://gist.github.com/damianesteban/7e9511ec794dab085ac2
 *
 *  Kill mongo instance and delete diagnostic data !!!!
 rm -f  /var/lib/mongo/diagnostic.data/*
 mongod --dbpath=/data --port 27017

 */

// call the packages we need
/*var fs = require('fs')
var https = require('https')*/
var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var cors = require('cors')
var crypto = require('crypto')
var request = require('request')

var ObjectId = require('mongodb').ObjectID
// use it before all route definitions
// app.use(cors({origin: 'http://localhost:3000'}))
app.use(cors())
//app.use(express.static('app'))
// configure app
app.use(morgan('dev')) // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port     = process.env.PORT || 8080 // 55555 //set our port

var mongoose   = require('mongoose')
// var Schema   = mongoose.Schema
var url = 'mongodb://localhost:27017/krazy'
//var url = 'mongodb://pajakoo:yaywotIdtagDup3@ds117965.mlab.com:17965/krazy'
mongoose.connect(url, function(err, db) {
  console.log("Connected correctly to DB server")
})

//Set up mongoose connection
/*
var mongoose = require('mongoose')
var mongoDB = 'mongodb://pajakoo:yaywotIdtagDup3@ds117965.mlab.com:17965/krazy'
mongoose.connect(mongoDB, {
  useMongoClient: true
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
*/

// connect to our database
var User     = require('./app/models/user')
var List     = require('./app/models/list')
var Item     = require('./app/models/item')

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router()

// middleware to use for all requests
router.use(function(req, res, next) {
  next()
  /*var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']

  if( createUser != 'fb_login'  ) {
    User.findOne({token: _token}, function (err, user) {
      if (err) {
        // user not found
        return res.status(401).json({error: 'User issue'})
      }

      if (!user) {
        // incorrect username
        return res.status(401).json({error: 'No user with such token'})
      }

      /!*if (!user.validPassword(password)) {
       // incorrect password
       res.status(401).json({error:'User issue'})
       }*!/

      // User has authenticated OK
      return next()
    })
  } else {

  }*/
  // https://www.facebook.com/FacebookforDevelopers/videos/10152795636318553/?type=2&theater   tutorial at:   https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
  // https://thewayofcode.wordpress.com/2013/11/25/how-to-secure-your-http-api-endpoints-using-facebook-as-oauth-provider/



  /*var _code = (req.body && req.body.code) || (req.query && req.query.code) || req.headers['x-access-token']
  console.log('_code', _code)
  var rp = require('request-promise')
  rp('https://graph.facebook.com/v2.11/oauth/access_token?client_id=1322466351129906&redirect_uri=http://localhost:3000/login&client_secret=' + _code).
    then((fbresponse) => {
      console.log('fb: ', JSON.parse(fbresponse)) //fbresponse.access_token
      rp('https://graph.facebook.com/v2.11/me?access_token=EAASyxrEWJTIBAGOzZBrSdImsZCGZBoX7kWyA128GDYITlmk5MZBi2RX9ZCU7GTW6ct29FPvkfMAe9HJG2iZCeRKr6QlyTgJnOqocpx9WRB21d5QuNesGC0l4kCvOxjCd06ppWxxZBuNV7mtMopgzc54pTWjn4TYxX5FawnKRHPzYokS86ZASeJbZBVMYOYjHIjQXeMvzHpu1XgQZDZD').
        then((fbresponse) => {
          next()
        })
    })*/

/*
  var createUser = (req.body && req.body.type) || (req.query && req.query.type)
    var rp = require('request-promise')
    rp('https://graph.facebook.com/debug_token?input_token=1322466351129906%7CcnjTtOhDthnzibuOfjCslwedCXc&access_token=' + _token).
    then( ( fbresponse ) => {
      if(!JSON.parse(fbresponse).data.is_valid) {
        return res.status(401).json({error: 'Token not valid'})
      } else {
        return next()
      }
    }).catch((err) =>
      res.status(401).json({error: 'Catch Token not valid: ' + err})
    )*/
})
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' })
})

// on routes that end in /users
// ----------------------------------------------------
router.route('/error', (e) => console.log('gg:',e)).get( (req, res) => res.status(401).json({"error":"Error PAGE"}))
router.route('/users')
	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {
    // Pass to next layer of middleware
    var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
    var createUser = (req.body && req.body.type) || (req.query && req.query.type)
		var user = new User()		// create a new instance of the User model
    // set the users name (comes from the request)

    if( createUser != 'fb_login'  ) {
      crypto.randomBytes(48, function (err, buffer) {
        user.token = buffer.toString('hex')
        user.name = req.body.name
        user.save(function (err) {
          if (err)
            res.send(err)

          res.json(user)
        })
      })
    } else {
      let _fbId = req.body.fbId

      if(!req.body.email) console.log('*** Proveide email popup ***', req.body.email)

      User.findOne({fbId: _fbId}, function(err, fbuser) {
        if (err) {
          // user not found
          return res.status(401).json({error: 'User issue'})
        }
        if(!fbuser) {
          user.token = _token
          user.fbId = _fbId
          user.name = req.body.name
          user.email = req.body.email
          user.save(function (err) {
            if (err)
              res.send(err)

            res.json(user)
          })
        } else {
          User.findOneAndUpdate(
            {fbId: _fbId},
            {$set: {token: _token}},
            function (err, documents) {
              res.send({ error: err, affected: documents })
            }
          )
          console.log('fbuser: ',fbuser, ' updated')
          res.json(fbuser)
        }

      })

        // https://graph.facebook.com/v2.11/me?access_token=&debug=all&fields=id%2Cname%2Cemail&format=json&method=get&pretty=0&suppress_http_code=1
      //DEBUGG // https://graph.facebook.com/me?access_token=EAASyxrEWJTIBAAdZCK2RLAYWvAyyF2eBuz71pVjD3ZC8t6mVbyPaZAl5AUVvEisYKt4LTjaivyXFKgeZBcVoUhaZBg1foicr62Ho3ay8LMiAfFQV3B7BLaCNpycLqAxXUeuEw9gPDVLQGne6rlDpEXEFSuZBzZAzI8rnZB18yARTZAqEONfd2AfuopBUMbOFOL6WZA77EPAyOW7gZDZD&debug=all&fields=id%2Cname%2Cemail&format=json&method=get&pretty=0&suppress_http_code=1

      /*var rp = require('request-promise')
      rp('https://graph.facebook.com/v2.11/me?access_token='+_token+'&debug=all&fields=id%2Cname%2Cemail&format=json&method=get&pretty=0&suppress_http_code=1').
        then( ( fbresponse ) => {
        //console.log(fbresponse)

        let _fbId = JSON.parse(fbresponse).id

        User.findOne({fbId: _fbId}, function (err, fbuser) {
          if (err)
            res.send(err)

          if(!fbuser){
            user.token = _token
            user.fbId = JSON.parse(fbresponse).id
            user.name = JSON.parse(fbresponse).name
            user.save(function (err) {
              if (err)
                res.send(err)

              res.json(user)
            })
          } else {

            User.findOneAndUpdate(
              {fbId: _fbId},
              {$set: {token: _token}},
              function (err, documents) {
                res.send({ error: err, affected: documents })
              }
            )
            console.log('fbuser: ',fbuser, ' updated')
            res.json(fbuser)
          }
        })

      }).catch((err) => console.log(err))*/

      // https://graph.facebook.com/oauth/client_code?access_token='+_token+'&client_secret=18341a34544c3cd58c99b1b40f98050c&redirect_uri=..../&client_id=1322466351129906
      //rp('https://graph.facebook.com/debug_token?input_token='+_token+'&access_token=EAASyxrEWJTIBAFwQBKbgAwdMETpGxC9kYHKXtsunDCm90Sn1plSKAWFkmPKkZBk29MDnUZBqpMMir4rZAgkA8S9M4hmm1EoGm8ZC5ZBQ0SsXd1ZCcHcCFDVnS91lGaEzUMc809MdgqLZB3jmUfMUvHCpgye9NnRLyUVJS2EtzKIePODd76SToc8jeFkj9eDoaQZD').
      //     rp('https://graph.facebook.com/oauth/client_code?access_token=1322466351129906%7CcnjTtOhDthnzibuOfjCslwedCXc&client_secret=18341a34544c3cd58c99b1b40f98050c&redirect_uri=http://localhost:3000/&client_id=1322466351129906').
      //https://graph.facebook.com/debug_token?input_token=1322466351129906%7CcnjTtOhDthnzibuOfjCslwedCXc&access_token=EAASyxrEWJTIBAKQTHRswXzIXMAZA0gzTWaaSEbiydLfrkKOEHd99S45cqvdHjZBUXXWryhQCq9YFThSVQiNf9BVlDrz3vqYFsglG8DMbl6FxBrbMg6JLHIZCbQplmyCj38mh2yvaonvdHTJKsbjkef6JMyE6ZCct6GydAKhQTV4ZBMuf3BVjZCU8tD6vGVPOD6SQkZBzTKZAIgZDZD

      /*var rp = require('request-promise')
          rp('https://graph.facebook.com/debug_token?input_token=1322466351129906%7CcnjTtOhDthnzibuOfjCslwedCXc&access_token=' + _token).
          then( ( fbresponse ) => {
            console.log('fbresponse:',JSON.parse(fbresponse))
            user.token = _token
            user.name = JSON.parse(fbresponse).name
            user.save(function (err) {
              if (err)
                res.send(err)

              res.json(user)
            })
          }).catch((err) => console.log(err))*/
    }
	})
	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err)

			res.json(users)
		})
	})

//  friends
// ----------------------------------------------------
router.route('/share').put( (req, res) => {
  var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']

  User.findById({_id:req.body.friendId}, function (err, user) {
    if (err)
      res.send(err)

      user.shared.push(req.body.listId)
      user.save(function (err) {
        if (err)
          res.send(err)

        User.findById({_id:req.body.friendId}).populate('shared').exec(function (err, lists) {
          if (err)
            res.send(err)

          res.json(lists)
          console.log('The shared is %s', lists)
        })
      })
  })
})

router.route('/friends').
get(function (req, res) {
  var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']

  User.findOne({token: _token}).populate('friends').exec(function (err, user) {
    if (err)
      res.send(err)

    res.json(user.friends)
    console.log('The friends for %s', user.friends)
  })

}).
put(function (req, res) {
  var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']

  User.findOne({token: _token}, function (err, user) {
    if (err)
      res.send(err)

    User.findById({_id: req.body.friendId}, function (err, friend) {
      if (err)
        res.send(err)

      user.friends.push(friend._id)
      user.save(function (err) {
        if (err)
          res.send(err)

        User.findOne({token: _token}).populate('friends').exec(function (err, friends) {
          if (err)
            res.send(err)

          res.json(friends)
          console.log('The friend is %s', friends)
        })
      })
    })
  })
})

router.route('/friends/:email')
  .get(function(req, res) {
    User.findOne({email: req.params.email}, function(err, friend) {
      if (err)
        res.send(err)

      res.json(friend)
    })

  })


      /*var list = new List({
        _id: listId,
        title: req.body.title,
        creator: user._id
      })
      list.save(function (err) {
        if (err)
          res.send(err)

        List.findOne({_id: list._id}).populate('creator').exec(function (err, list) {
          if (err)
            res.send(err)

          res.json(list)
          console.log('The author is %s', list.creator.name)
        })

      })
*/
  router.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err)
			res.json(user)
		})
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err)

			user.name = req.body.name
			user.save(function(err) {
				if (err)
					res.send(err)

				res.json({ message: 'User updated!' })
			})

		})
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err)
			res.json({ message: 'Successfully deleted' })
		})
	})

router.route('/items/:list_id')
  .get(function(req, res) {
    List.findById(req.params.list_id, function(err, list) {
      if (err)
        res.send(err)

      res.json(list.items)
    })
  })
  .post(function (req, res) {
    //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
    var item = new Item()
    item.name = req.body.name
    item.completed = req.body.completed

    List.findById(req.params.list_id, function(err, list) {
      if (err)
        res.send(err)
      list.items.push(item)
      list.save()
      res.json({message: 'Item was added in '+list._id})
    })
  })

router.route('/update/list/:list_id')
  .put(function (req, res) {
      List.update(
        {_id: ObjectId(req.params.list_id)},
        {$set: {items: req.body.items}},
        function (err, documents) {
          res.send({error: err, affected: documents})
        }
      )
      res.json({message: 'Items Successfully updated'})
  })

router.route('/list/:list_id/item/:item_id')
  .put(function (req, res) {

    List.findOneAndUpdate(
      {_id: ObjectId(req.params.list_id)},
      {$pull: {items: {_id: ObjectId(req.params.item_id)}}},
      { new: true },
      function (err, documents) {
        res.send({ error: err, affected: documents })
      }
    )
    res.json({message: 'Successfully deleted'})

  })

//router.route('/lists/:list_id/location')
router.route('/listtime/:list_id')
  .put(function (req, res) {

    List.findOneAndUpdate(
      {_id: ObjectId(req.params.list_id)},
      {$set: {remainder: req.body.time}},
      function (err, documents) {
        res.send({ error: err, affected: documents })
      }
    )
    res.json({message: 'Successfully deleted'})

  })
router.route('/listcoords/:list_id')
  .put(function (req, res) {
    List.findOneAndUpdate(
      {_id: ObjectId(req.params.list_id)},
      {$set: {placeCoordinates: req.body.coords}},
      function (err, documents) {
        res.send({ error: err, affected: documents })
      }
    )
    res.json({message: 'Successfully update coords for list: '+req.params.list_id, data:req.body.coords})

  })

router.route('/lists/:list_id')
  .delete(function (req, res) {
    List.remove({
      _id: req.params.list_id
    }, function (err, list) {
      if (err)
        res.send(err)
      res.json({message: 'Successfully deleted', list})
    })
  })
  /*.get(function(req, res) {
    List.findById(req.params.list_id, function(err, list) {
      if (err)
        res.send(err)
      res.json(list)
    })
  })
  .post(function (req, res) {
    var list = new List()
    list.title = req.body.title

    list.save(function (err) {
      if (err)
        res.send(err)
      res.json({message: 'LIST created!'})
    })
  })*/

router.route('/lists')
  .post(function (req, res) {
    // https://stackoverflow.com/questions/40723019/mongoose-and-mongodb-out-of-sync-with-relationships/40723300
    // http://dbversity.com/mongodb-dbref-database-references-usage/

    var listId = new ObjectId()
    var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
    User.findOne({token: _token}, function (err, user) {
      if (err)
        res.send(err)

      user.lists.push(listId)

      user.save(function (err) {
        if (err)
          res.send(err)

        var list = new List({
          _id: listId,
          title: req.body.title,
          creator: user._id
        })
        list.save(function (err) {
          if (err)
            res.send(err)

          List.findOne({_id: list._id}).populate('creator').exec(function (err, list) {
            if (err)
              res.send(err)

            res.json(list)
            console.log('The author is %s', list.creator.name)
          })

          User.
          find({}).
          populate('lists').
          exec(function (err, user) {
            if (err)
              res.send(err)

            res.json(user)
            // console.log('The lists for %s', user)
          })

        })
      })
    })

  })
  .get(function (req, res) {
    var _token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
    //console.log('_token: ',_token)
    User.
    findOne({token:_token}).
    populate('lists shared').
    exec(function (err, user) {
      if (err)
        res.send(err)

      res.json(user)
      console.log('The lists for %s', user)
    })

    /*
    List.find(function (err, lists) {
      if (err)
        res.send(err)

      res.json(lists)
    })*/
  })

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router)

// START THE SERVER
// =============================================================================

//http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/
//https://stackoverflow.com/questions/31254725/transport-security-has-blocked-a-cleartext-http
// https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
//   //passphrase: <passphraseusedwhilecreatingcertificate>
// }, app).listen(port)

app.listen(port)
console.log('Magic happens on port ' + port)
