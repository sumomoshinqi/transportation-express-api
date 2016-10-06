/** 
 * Express Route: /cars
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var mongoose     = require('mongoose');


var Car = require('../app/models/car');


router.route('/cars') 
    /**
     * GET call for the car entity (multiple).
     * @returns {object} A list of cars. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Car.find(function(err, cars){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1007,
                    "errorMsg" : 'No car data',
                });
            }else{
                res.json(cars);
            }
        });
    })
    /**
     * POST call for the car entity.
     * @param {string} license - The license plate of the new car
     * @param {integer} doorCount - The amount of doors of the new car
     * @param {string} make - The make of the new car
     * @param {string} model - The model of the new car
     * @returns {object} A message and the car created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        if (typeof req.body.make === "undefined" || req.body.make.length > 18) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in car"
            });
            return;
        }
        if (typeof req.body.model === "undefined" || req.body.model.length > 18) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in car"
            });
            return;
        }
        if (typeof req.body.license === "undefined" || req.body.license.length > 10) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in car"
            });
            return;
        }
        if (typeof req.body.doorCount === "undefined" || req.body.doorCount > 8 || req.body.doorCount < 1) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in car"
            });
            return;
        }


        var car = new Car();
        car.license = req.body.license;
        car.doorCount = req.body.doorCount;
        car.make = req.body.make;
        car.model = req.body.model;

        car.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json(car);
            }
        });
    });

/** 
 * Express Route: /cars/:car_id
 * @param {string} car_id - Id Hash of Car Object
 */
router.route('/cars/:car_id')
    /**
     * GET call for the car entity (single).
     * @returns {object} the car with Id car_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){

        if (!mongoose.Types.ObjectId.isValid(req.params.car_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1002,
                    "errorMsg" : 'Given car does not exist',
                });
            }else{
                if (!car)
                    res.sendStatus(404);
                else
                    res.json(car);
            }
        });  
    })
    /**
     * PATCH call for the car entity (single).
     * @param {string} license - The license plate of the new car
     * @param {integer} doorCount - The amount of doors of the new car
     * @param {string} make - The make of the new car
     * @param {string} model - The model of the new car
     * @returns {object} A message and the car updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        /**
         * Add extra error handling rules here
         */

        Car.findById(req.params.car_id, function(err, car){
            if(err){
                res.status(500).send(err);
            }else{
                for(var key in req.body) {
                    if(req.body.hasOwnProperty(key)){
                        if(key == 'license'){
                            if (typeof req.body.license === "undefined" || req.body.license.length > 10) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in car"
                                });
                                return;
                            }
                            car.license = req.body.license;
                        }
                        if(key == 'doorCount'){
                            if (typeof req.body.doorCount === "undefined" || req.body.doorCount > 8 || req.body.doorCount < 1) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in car"
                                });
                                return;
                            }
                            car.doorCount = req.body.doorCount;
                        }
                        if(key == 'make' || key == 'model') {
                            if (typeof req.body[key] === "undefined" || req.body[key].length > 18) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in car"
                                });
                                return;
                            }
                        }
                    }
                }

                car.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json(car);
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the car entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Car.remove({
            _id : req.params.car_id
        }, function(err, car){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1002,
                    "errorMsg" : 'Given car does not exist',
                });
            }else{
                res.json({"message" : "Car Deleted"});
            }
        });
    });

module.exports = router;