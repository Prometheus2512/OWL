var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Book = require('../models/Book');

//Get all users
router.get('/', function(req, res) {
    console.log('Getting all Users');
    Book.find({}).exec(function(err, usr) {
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
    Book.findOne({
        _id: req.params.id
    }).exec(function(err, usr) {
        if (err) {
            res.status(400);
            res.send('error has occured');
        } else {
            console.log(usr);
            res.json(usr);
        }
    });
});




//ADD new user 
router.post('/add', function(req, res) {
    console.log(req.body);
    var b = new Book();
    var owlet = req.body.owlet_id;
    b.isbn = req.body.isbn;
    b.title = req.body.title;
    b.image = req.body.image;
    b.state = req.body.state;
    b.genre = req.body.genre;
    b.save(function(err, bk) {

        if (err) {
            console.log(err)
            res.status(400);
            res.send('Error saving book');
        } else {
            User.findOne({
                _id: owlet
            }).populate('books').exec(function(err, usr) {
                if (err) {
                    res.status(400);
                    res.send('error finding user');
                } else {
                    usr.books.push(bk._id);
                    usr.save(function(err) {
                        if (err) {
                            console.error('ERROR!');
                        } else {

                            console.log(usr);
                            res.json(usr);
                        }
                    });

                }
            });



        }

    })
});


module.exports = router;