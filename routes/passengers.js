/** 
 * Express Route: /passengers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');
var mongoose     = require('mongoose');


var Passenger = require('../app/models/passenger');

router.route('/passengers') 
    /**
     * GET call for the passenger entity (multiple).
     * @returns {object} A list of passengers. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        Passenger.find(function(err, passengers){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1009,
                    "errorMsg" : 'No passenger data',
                });
            }else{
                res.json(passengers);
            }
        });
    })
    /**
     * POST call for the passenger entity.
     * @param {string} firstName - The first name of the new passenger
     * @param {string} lastName - The last name of the new passenger
     * @param {date} dateOfBirth - The date of birth of the new passenger
     * @param {string} username - The username of the new passenger
     * @param {string} password - The password of the new passenger
     * @param {string} addressLine1 - The address line 1 of the new passenger
     * @param {string} addressLine2 - The address line 2 of the new passenger
     * @param {string} city - The city of the new passenger
     * @param {string} state - The state of the new passenger
     * @param {number} zip - The zip code of the new passenger
     * @param {number} phoneNumber - The phone number of the new passenger
     * @returns {object} A message and the passenger created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        if (typeof req.body.firstName === "undefined" || req.body.firstName.length > 15) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        if (typeof req.body.lastName === "undefined" || req.body.lastName.length > 15) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        var email_re = new RegExp("[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*");
        if (typeof req.body.emailAddress === "undefined" || !email_re.test(req.body.emailAddress)) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        if (typeof req.body.password === "undefined" || req.body.password.length > 16) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        if (typeof req.body.city === "undefined" || req.body.city.length > 50) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        if (typeof req.body.state === "undefined" || req.body.state.length > 2) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        if (typeof req.body.zip === "undefined" || req.body.zip.length > 5) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }
        if (typeof req.body.phoneNumber === "undefined") {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in passenger"
            });
            return;
        }


        var passenger = new Passenger();
        passenger.firstName = req.body.firstName;
        passenger.lastName = req.body.lastName;
        passenger.username = req.body.username;
        passenger.emailAddress = req.body.emailAddress;
        passenger.password = req.body.password;
        passenger.addressLine1 = req.body.addressLine1;
        passenger.addressLine2 = req.body.addressLine2;
        passenger.city = req.body.city;
        passenger.state = req.body.state;
        passenger.zip = req.body.zip;
        passenger.phoneNumber = req.body.phoneNumber;

        passenger.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json(passenger);
            }
        });
    });

/** 
 * Express Route: /passengers/:passenger_id
 * @param {string} passenger_id - Id Hash of passenger Object
 */
router.route('/passengers/:passenger_id')
    /**
     * GET call for the passenger entity (single).
     * @returns {object} the passenger with Id passenger_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */

        if (!mongoose.Types.ObjectId.isValid(req.params.passenger_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1004,
                    "errorMsg" : 'Given passenger does not exist',
                });
            }else{
                if (!passenger)
                    res.status(404).send({});

                else
                res.json(passenger);
            }
        });  
    })
    /**
     * PATCH call for the passenger entity (single).
     * @param {string} firstName - The first name of the new passenger
     * @param {string} lastName - The last name of the new passenger
     * @param {date} dateOfBirth - The date of birth of the new passenger
     * @param {string} username - The username of the new passenger
     * @param {string} password - The password of the new passenger
     * @param {string} addressLine1 - The address line 1 of the new passenger
     * @param {string} addressLine2 - The address line 2 of the new passenger
     * @param {string} city - The city of the new passenger
     * @param {string} state - The state of the new passenger
     * @param {number} zip - The zip code of the new passenger
     * @param {number} phoneNumber - The phone number of the new passenger
     * @returns {object} A message and the passenger updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        /**
         * Add aditional error handling here
         */
        Passenger.findById(req.params.passenger_id, function(err, passenger){
            if(err){
                res.status(500).send(err);
            }else{
                for(var key in req.body) {
                    if(req.body.hasOwnProperty(key)){
                        if(key == 'firstName'){
                            if (typeof req.body.firstName === "undefined" || req.body.firstName.length > 15) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }
                            passenger.firstName = req.body.firstName;
                        }
                        if(key == 'lastName'){
                            if (typeof req.body.lastName === "undefined" || req.body.lastName.length > 15) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }
                            passenger.lastName = req.body.lastName;
                        }
                        if(key == 'emailAddress'){
                            var email_re = new RegExp("[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*");
                            if (typeof req.body.emailAddress === "undefined" || !email_re.test(req.body.emailAddress)) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }
                            passenger.emailAddress = req.body.emailAddress;
                        }
                        if(key == 'password'){
                            if (typeof req.body.password === "undefined" || req.body.password.length > 16) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }
                            passenger.password = req.body.password;
                        }
                        if(key == 'city') {
                            if (typeof req.body.city === "undefined" || req.body.city.length > 50) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }                            
                            passenger.city = req.body.city;
                        }
                        if(key == 'state') {
                            if (typeof req.body.state === "undefined" || req.body.state.length > 2) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }                            
                            passenger.state = req.body.state;
                        }
                        if(key == 'zip') {
                            if (typeof req.body.zip === "undefined" || req.body.zip.length > 5) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }                            
                            passenger.zip = req.body.zip;
                        }
                        if(key == 'phoneNumber') {
                            if (typeof req.body.phoneNumber === "undefined") {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in passenger"
                                });
                                return;
                            }                            
                            passenger.phoneNumber = req.body.phoneNumber;
                        }
                    }
                }

                passenger.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "Passenger Updated", "passengerUpdated" : passenger});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the passenger entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        Passenger.remove({
            _id : req.params.passenger_id
        }, function(err, passenger){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1004,
                    "errorMsg" : 'Given passenger does not exist',
                });
            }else{
                res.json({"message" : "Passenger Deleted"});
            }
        });
    });

module.exports = router;