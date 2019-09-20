var express = require('express');
var router = express.Router();
var User = require('../models/User');


//Get all users
router.get('/', function(req, res) {
  console.log('Getting all Users');
  User.find({}).exec(function(err, usr) {
      if (err) {
          res.status(400);
          res.send('error has occured');
      } else {
          console.log(usr);
          res.json(usr);
      }
  });
});



//Get user by ID
router.get('/getbyid/:id', function(req, res) {
  console.log('Getting user by ID');
  User.findOne({_id:req.params.id}).exec(function(err, usr) {
      if (err) {
          res.status(400);
          res.send('error has occured');
      } else {
          console.log(usr);
          res.json(usr);
      }
  });
});


//Get user by ID
router.get('/login/:id', function(req, res) {
  console.log('LOGIN');
  User.findOne({_id:req.params.id}).exec(function(err, usr) {
      if (err) {
          res.status(400);
          res.send('error has occured');
      } else {
          console.log(usr);
          res.cookie('username',"ahmed ben hammouda");
          res.cookie('OWL_ID',req.params.id);
          res.json(usr);
      }
  });
});


//ADD new user 
router.post('/add', function(req, res) {
    console.log(req.body);
    var u = new User();
    u.email = req.body.email;
    u.username = req.body.username;
    u.password = req.body.password;
    u.firstName = req.body.firstName;
    u.lastName = req.body.lastName;
    u.save(function(err, usr) {

        if (err) {
            console.log(err)
            res.status(400);
            res.send('Error saving User');
        } else {
            console.log('saving user')
            console.log(usr);

            res.send(usr);

        }

    })
});


module.exports = router;