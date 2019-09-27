var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Book = require('../models/Book');

//Get all books
router.get('/', function(req, res) {
    console.log('Getting all Books');
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



//Get book by ID
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

//ADD new book  2.0
router.post('/add', function(req, res) {
    var b = new Book();
    var owlet = req.body.owlet_id;
    b.isbn = req.body.isbn;
    b.title = req.body.title;
    b.image = req.body.image;
    b.state = req.body.state;
    b.genre = req.body.genre;
    User.findOne({
        _id: owlet
    }).populate('books').exec(function(err, usr) {
        if (err) {
            res.status(400);
            res.send('error finding user');
        } else {
            b.save(function(err, bk) {

                if (err) {
                    console.log(err)
                    res.status(400);
                    res.send('Error saving book');
                } else {
             
                    usr.books.push(bk._id);
                    usr.save(function(err,usr2) {
                        if (err) {
                            console.error('ERROR!');
                        } else {

                            console.log(usr2);
                            res.json(usr2);
                        }
                    });
        
        
                }
        
            })

        }
    });
});

//Add a proposition
router.post('/offers/answer', function(req, res) {
    var owlet_id=req.body.owlet_id;    
    var offer_id= req.body.offer_id;
    var proposition_id= req.body.proposition_id;
    //recherche proposition + verif(user = offer.user) + 

    User.findOne({
        _id: owlet_id
    }).exec(function(err, usr) {
        if (err) {
            res.status(400);
            res.send('Error finding user');
        } else {
            if (usr.books.includes(proposition_id))
            {



                Book.findOne({
                    _id: offer_id
                }).exec(function(err, offer) {
                    if (err) {
                        res.status(400);
                        res.send('Offer not found');
                    } else {
                        if(offer.offers.includes(proposition_id))
                        {
                        res.status(401);
                        res.send('Suggestion already added');
                        }
                        else{
                            
                            offer.offers.push(proposition_id);
                            offer.save(function(err) {
                                if (err) {
                                    console.error('ERROR!');
                                } else {
        
                                    console.log(offer);
                                    res.json(offer);
                                }
                            });
                        
                        }
                       
                      
            
                    }
                });
                
            }
            else
            {
                res.status(401);
                res.send("UNOTHORIZED");
            }
          

        }
    });

});


//confirm a proposition
router.post('/offer/confirm', function(req, res) {
    var owlet_id=req.body.owlet_id;    
    var offer_id= req.body.offer_id;
    var proposition_id= req.body.proposition_id;
    //recherche proposition + verif(user = offer.user) + 

    User.findOne({
        _id: owlet_id
    }).exec(function(err, usr) {
        if (err) {
            res.status(400);
            res.send('Error finding user');
        } else {
            if (usr.books.includes(offer_id))
            {

                Book.findOne({
                    _id: offer_id
                }).exec(function(err, offer) {
                    if (err) {
                        res.status(400);
                        res.send('Offer not found');
                    } else {
                        if(offer.offers.includes(proposition_id))
                        {
                            offer.offers.splice(offer.offers.indexOf(proposition_id), 1);
                            offer.confirmedoffer=proposition_id;
                            offer.save(function(err, bk) {

                                if (err) {
                                    console.log(err)
                                    res.status(400);
                                    res.send('Error saving book');
                                } else {
                             
                                   res.send(bk);
                                }
                        
                            })
                
                        }
                        else{
                            
                            res.status(401);
                            res.send('Proposition not found in current offer ');                
                        }
                       
                      
            
                    }
                });
                
            }
            else
            {
                res.status(401);
                res.send("UNOTHORIZED");
            }
          

        }
    });

});




  //ADD proposition
router.post('/propose/:offer', function(req, res) {
    var b = new Book();
    var owlet = req.body.owlet_id;
    b.isbn = req.body.isbn;
    b.title = req.body.title;
    b.image = req.body.image;
    b.state = req.body.state;
    b.genre = req.body.genre;
    User.findOne({
        _id: owlet
    }).populate('books').exec(function(err, usr) {
        if (err) {
            res.status(400);
            res.send('error finding user');
        } else {
            b.save(function(err, bk) {

                if (err) {
                    console.log(err)
                    res.status(400);
                    res.send('Error saving book');
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
        
            })

        }
    });
});

module.exports = router;