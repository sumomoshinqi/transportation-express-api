/** 
 * Express Route: /rides
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var Ride = require('../app/models/ride');

/**
 * Here you must add the routes for the Ride entity
 * /rides/:id/routePoints (POST)
 * /rides/:id/routePoints (GET)
 * /rides/:id/routePoint/current (GET)
 */
 router.route('/rides/:ride_id/routePoints') 
    .post(function(req, res){
        Ride.findById(req.params.ride_id, function(err, ride){
            if(err){
                res.status(500).send({
                   "statusCode" : 500,
                    "errorCode" : 1012,
                    "errorMsg" : 'Given ride does not exist',
                });
            }else{
                var rp = {};                
                rp.latitude = req.body.latitude;
                rp.longitude = req.body.longitude;
                ride.route.push(rp);
            }
            ride.save(function(err){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.json({"message" : "Ride Updated", "new route point added" : ride});
                }
            });
    	});
    })
    .get(function(req, res){        
        Ride.findById(req.params.ride_id, function(err, Ride){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1010,
                    "errorMsg" : 'Given Ride does not exist',                    
                });
            }else{
                res.json(ride.route);
            }
        });  
    });
 router.route('/rides/:ride_id/routePoints/current')
 	.get(function(req, res){        
        Ride.findById(req.params.ride_id, function(err, Ride){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1010,
                    "errorMsg" : 'Given Ride does not exist',                    
                });
            }else{
            	var current = ride.route.slice(-1)[0]
                res.json(current);
            }
        });  
    });
module.exports = router;