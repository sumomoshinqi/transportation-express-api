/** 
 * Express Route: /paymentaccounts
 * @author Clark Jeria
 * @version 0.0.3
 */
var express = require('express');
var router = express.Router();
var util = require('util');

var PaymentAccount = require('../app/models/paymentaccount');

router.route('/paymentaccounts') 
    /**
     * GET call for the paymentAccount entity (multiple).
     * @returns {object} A list of paymentAccounts. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){
        PaymentAccount.find(function(err, paymentAccounts){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1011,
                    "errorMsg" : 'No paymentAccount data',
                });
            }else{
                res.json(paymentAccounts);
            }
        });
    })
    /**
     * POST call for the paymentAccount entity.
     * @param {string} accountType - The account type of the new paymentAccount
     * @param {integer} accountNumber - The account number of the new paymentAccount
     * @param {date} expirationDate - The expiration date of the new paymentAccount
     * @param {string} nameOnAccount - The name on account of the new paymentAccount
     * @param {string} bank - The bank of the new paymentAccount
     * @returns {object} A message and the paymentAccount created. (201 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .post(function(req, res){
        if(typeof req.body.accountType === 'undefined'){
            res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "accountType"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.accountNumber === 'undefined'){
            res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "accountNumber"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.nameOnAccount === 'undefined'){
            res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "nameOnAccount"), "statusCode" : "422"});
            return;
        }

        var paymentAccount = new PaymentAccount();
        paymentAccount.accountType = req.body.accountType;
        paymentAccount.accountNumber = req.body.accountNumber;
        paymentAccount.expirationDate = req.body.expirationDate;
        paymentAccount.nameOnAccount = req.body.nameOnAccount;
        paymentAccount.bank = req.body.bank;

        paymentAccount.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json({"message" : "PaymentAccount Created", "paymentAccountCreated" : paymentAccount});
            }
        });
    });

/** 
 * Express Route: /paymentaccounts/:paymentaccount_id
 * @param {string} paymentaccount_id - Id Hash of PaymentAccount Object
 */
router.route('/paymentaccounts/:paymentaccount_id')
    /**
     * GET call for the paymentAccount entity (single).
     * @returns {object} the paymentaccount with Id paymentaccount_id. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function(req, res){        
        PaymentAccount.findById(req.params.paymentaccount_id, function(err, paymentAccount){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1010,
                    "errorMsg" : 'Given paymentAccount does not exist',                    
                });
            }else{
                res.json(paymentAccount);
            }
        });  
    })
    /**
     * PATCH call for the paymentAccount entity (single).
     * @param {string} accountType - The account type of the new paymentAccount
     * @param {integer} accountNumber - The account number of the new paymentAccount
     * @param {date} expirationDate - The expiration date of the new paymentAccount
     * @param {string} nameOnAccount - The name on account of the new paymentAccount
     * @param {string} bank - The bank of the new paymentAccount
     * @returns {object} A message and the paymentAccount created. (201 Status Code)
     * @returns {object} A message and the paymentaccount updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .patch(function(req, res){
        if(typeof req.body.accountType === 'undefined'){
            res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "accountType"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.accountNumber === 'undefined'){
            res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "accountNumber"), "statusCode" : "422"});
            return;
        }
        if(typeof req.body.nameOnAccount === 'undefined'){
            res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "nameOnAccount"), "statusCode" : "422"});
            return;
        }

        PaymentAccount.findById(req.params.paymentaccount_id, function(err, paymentAccount){
            if(err){
                res.status(500).send(err);
            }else{
                for(var key in req.body) {
                    if(req.body.hasOwnProperty(key)){
                        if(key == 'accountType'){
                            if(typeof req.body.accountType === 'undefined'){
                                res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "accountType"), "statusCode" : "422"});
                                return;
                            }
                            paymentAccount.accountType = req.body.accountType;
                        }
                        if(key == 'accountNumber'){
                            if(typeof req.body.accountNumber === 'undefined'){
                                res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "accountNumber"), "statusCode" : "422"});
                                return;
                            }
                            paymentAccount.accountNumber = req.body.accountNumber;
                        }
                        if(key == 'nameOnAccount'){
                            if(typeof req.body.nameOnAccount === 'undefined'){
                                res.status(422).json({"errorCode": "1006", "errorMessage" : util.format("Missing required parameter %s", "nameOnAccount"), "statusCode" : "422"});
                                return;
                            }
                            paymentAccount.nameOnAccount = req.body.nameOnAccount;
                        }
                    }
                }

                paymentaccount.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json({"message" : "PaymentAccount Updated", "paymentAccountUpdated" : paymentAccount});
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the paymentaccount entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function(req, res){  
        PaymentAccount.remove({
            _id : req.params.paymentaccount_id
        }, function(err, paymentaccount){
            if(err){
                res.status(500).send({
                    "statusCode" : 500,
                    "errorCode" : 1010,
                    "errorMsg" : 'Given paymentAccount does not exist',                        
                });
            }else{
                res.json({"message" : "PaymentAccount Deleted"});
            }
        });
    });

module.exports = router;