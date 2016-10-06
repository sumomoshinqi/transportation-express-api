/** 
 * Express Route: /drivers
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');
var mongoose     = require('mongoose');


var Driver = require('../app/models/driver');

router.route('/drivers') 
    /**
     * GET call for the driver entity (multiple).
     * @returns {object} A list of drivers. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Driver.find(function(err, drivers){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1008,
                    "errorMsg" : 'No driver data',
                });
            }else{
                res.json(drivers);
            }
        });
    })
    /**
     * POST call for the driver entity.
     * @param {string} firstName - The first name of the new driver
     * @param {string} lastName - The last name of the new driver
     * @param {date} dateOfBirth - The date of birth of the new driver
     * @param {string} licenseType - The license type of the new driver
     * @param {string} username - The username of the new driver
     * @param {string} password - The password of the new driver
     * @param {string} addressLine1 - The address line 1 of the new driver
     * @param {string} addressLine2 - The address line 2 of the new driver
     * @param {string} city - The city of the new driver
     * @param {string} state - The state of the new driver
     * @param {number} zip - The zip code of the new driver
     * @param {number} phoneNumber - The phone number of the new driver
     * @returns {object} A message and the driver created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        if (typeof req.body.firstName === "undefined" || req.body.firstName.length > 15) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.lastName === "undefined" || req.body.lastName.length > 15) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        var email_re = new RegExp("[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*");
        if (typeof req.body.emailAddress === "undefined" || !email_re.test(req.body.emailAddress)) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.password === "undefined" || req.body.password.length > 16) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.city === "undefined" || req.body.city.length > 50) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.state === "undefined" || req.body.state.length > 2) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.zip === "undefined" || req.body.zip.length > 5) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.drivingLicense === "undefined" || req.body.drivingLicense.length > 16 || req.body.drivingLicense < 8) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }
        if (typeof req.body.licensedState === "undefined" || req.body.licensedState.length > 2) {
            res.status(400).send({
                "statusCode" : 400,
                "errorCode" : 1005,
                "errorMsg" : "Invalid value in driver"
            });
            return;
        }

        var driver = new Driver();
        driver.firstName = req.body.firstName;
        driver.lastName = req.body.lastName;
        driver.dateOfBirth = req.body.dateOfBirth;
        driver.licenseType = req.body.licenseType;
        driver.username = req.body.username;
        driver.emailAddress = req.body.emailAddress;
        driver.password = req.body.password;
        driver.addressLine1 = req.body.addressLine1;
        driver.addressLine2 = req.body.addressLine2;
        driver.city = req.body.city;
        driver.state = req.body.state;
        driver.zip = req.body.zip;
        driver.phoneNumber = req.body.phoneNumber;

        driver.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json(driver);
            }
        });
    });

/** 
 * Express Route: /drivers/:driver_id
 * @param {string} driver_id - Id Hash of driver Object
 */
router.route('/drivers/:driver_id')
    /**
     * GET call for the driver entity (single).
     * @returns {object} the driver with Id driver_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        /**
         * Add extra error handling rules here
         */
        if (!mongoose.Types.ObjectId.isValid(req.params.driver_id)) {
            res.status(404).send({errorCode: 4000});
            return;
        }

        Driver.findById(req.params.driver_id, function(err, driver){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1003,
                    "errorMsg" : 'Given driver does not exist',
                });
            }else{
                if (!driver)
                    res.status(404).send({});
                else
                    res.json(driver);
            }
        });  
    })
    /**
     * PATCH call for the driver entity (single).
     * @param {string} firstName - The first name of the new driver
     * @param {string} lastName - The last name of the new driver
     * @param {date} dateOfBirth - The date of birth of the new driver
     * @param {string} licenseType - The license type of the new driver
     * @param {string} username - The username of the new driver
     * @param {string} password - The password of the new driver
     * @param {string} addressLine1 - The address line 1 of the new driver
     * @param {string} addressLine2 - The address line 2 of the new driver
     * @param {string} city - The city of the new driver
     * @param {string} state - The state of the new driver
     * @param {number} zip - The zip code of the new driver
     * @param {number} phoneNumber - The phone number of the new driver
     * @returns {object} A message and the driver updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){        

        Driver.findById(req.params.driver_id, function(err, driver){
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
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }
                            driver.firstName = req.body.firstName;
                        }
                        if(key == 'lastName'){
                            if (typeof req.body.lastName === "undefined" || req.body.lastName.length > 15) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }
                            driver.lastName = req.body.lastName;
                        }
                        if(key == 'emailAddress'){
                            var email_re = new RegExp("[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*");
                            if (typeof req.body.emailAddress === "undefined" || !email_re.test(req.body.emailAddress)) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }
                            driver.emailAddress = req.body.emailAddress;
                        }
                        if(key == 'password'){
                            if (typeof req.body.password === "undefined" || req.body.password.length > 16 || req.body.password.length < 8) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }
                            driver.password = req.body.password;
                        }
                        if(key == 'city') {
                            if (typeof req.body.city === "undefined" || req.body.city.length > 50) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }                            
                            driver.city = req.body.city;
                        }
                        if(key == 'state') {
                            if (typeof req.body.state === "undefined" || req.body.state.length > 2) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }                            
                            driver.state = req.body.state;
                        }
                        if(key == 'zip') {
                            if (typeof req.body.zip === "undefined" || req.body.zip.length > 5) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }                            
                            driver.zip = req.body.zip;
                        }
                        if(key == 'phoneNumber') {
                            if (typeof req.body.phoneNumber === "undefined" || req.body.phoneNumber.length > 10) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }                            
                            driver.phoneNumber = req.body.phoneNumber;
                        }
                        if(key == 'drivingLicense'){
                            if (typeof req.body.drivingLicense === "undefined" || req.body.drivingLicense.length > 16 || req.body.drivingLicense < 8) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }                            
                            driver.drivingLicense = req.body.drivingLicense;
                        }
                        if(key == 'licensedState'){
                            if (typeof req.body.licensedState === "undefined" || req.body.licensedState.length > 2) {
                                res.status(400).send({
                                    "statusCode" : 400,
                                    "errorCode" : 1005,
                                    "errorMsg" : "Invalid value in driver"
                                });
                                return;
                            }
                            driver.licensedState = req.body.licensedState;
                        }
                    }
                }

                driver.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "Driver Updated", "driverUpdated" : driver});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the driver entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){
        /**
         * Add extra error handling rules here
         */
        Driver.remove({
            _id : req.params.driver_id
        }, function(err, driver){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1003,
                    "errorMsg" : 'Given driver does not exist',
                });
            }else{
                res.json({"message" : "Driver Deleted"});
            }
        });
    });

module.exports = router;