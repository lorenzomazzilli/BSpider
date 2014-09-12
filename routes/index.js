var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    console.log("usercollection = " + collection);
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
        console.log("dopo di render, lunghezza collection " + docs);
    });
});

/* GET New User page. */
router.get('/newuser',function(req, res) {
        res.render('newuser', {title: 'Add a new user'});
});

/* POST to add user service. */
router.post('/adduser',function(req, res) {
    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('usercollection');

    collection.insert(
                        {
                            "username" : userName,
                            "email" : userEmail
                        },
                        function(err, doc){
                            if(err){
                                res.send("There was a problem adding the information to the database.");
                            } else {
                                // If it worked, set the header so the address bar doesn't still say /adduser
                                res.location("userlist");
                                // And forward to success page
                                res.redirect("userlist");
                            }
                        }
    )
});

router.get('/BSpider/:countryId/:bankId/',function(req, res) {
//TODO: raffinare meglio la route con regex

    res.render('getinfo', { title: 'get info page',
                            countryId : req.params.countryId,
                            bankId : req.params.bankId
                            }
                );
});

module.exports = router;
