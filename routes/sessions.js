var express      = require('express');
var router       = express.Router();
var util         = require('util');
var mongoose     = require('mongoose');

var Util         = require('./util');
var CryptoJS     = require("crypto-js");
var base64       = require("js-base64").Base64;
var User         = require('../app/models/user');
var config       = require('../config'); // get our config file
var jwt          = require('jsonwebtoken'); // used to create, sign, and verify tokens



router.get('/setup', function(req, res) {

  // create a sample user
  var psw = Util.sha512('MYPASSWORD');
  console.log(psw);
  var new_user = new User({ 
    name: 'Edam', 
    password: psw,
    admin: true 
  });

  // save the sample user
  new_user.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.route('/sessions')
    .post(function(req, res){
        // use hardcode for testing
        username = "Edam";
        var psw = Util.sha512('MYPASSWORD');
        // find the user
        User.findOne({
            name: username
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({"errorCode": "1010", "errorMessage" : "Authentication failed. User not found.", "statusCode" : "400"});
            } else if (user) {
                if (user.password != psw) {
                    res.json({"errorCode": "1011", "errorMessage" : "Authentication failed. Wrong password.", "statusCode" : "400"});
                } else {
                    var token = jwt.sign(user, config.secret, {
                            expiresIn : 60*60*24 // expires in 24 hours
                    });
                    
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Yo I\'m a token!',
                        token: token
                    }).end();                    
                    // expiration = (parseInt(Date.now()/1000) + 3600);
                    // clearString = username+":"+expiration;
                    // cryptString = base64.encode(clearString);
                    // response = {token: cryptString}
                    // console.log("token", cryptString);
                    // res.status(200).json(response);
                }
            }
        }
    )
    });

module.exports = router;