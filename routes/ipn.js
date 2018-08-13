var express = require('express');
var request = require('request');
var IOTA = require('iota.lib.js/lib/iota');
var router = express.Router();
var payments = [];


/* Receives GET requests from the front-end and waits for confirmation */
router.get('/:address-:price', function (req, res) {
    //IOTA instance
    var iota = new IOTA({
        'provider': 'http://188.68.60.136:14265'
    });
    //Status of the request on the client side
    var cancelRequest = false;
    //Array with the payment address
    var address = [];
    address.push(req.params.address);
    //Object for the search
    var searchValues = {'addresses': address};
    //If request aborted on the client side, change the state
    req.on('close', function (){
        cancelRequest = true;
    });
    //Check for confirmation in intervals of 1 second
    function check(){
        setTimeout(function () {
            //Search for transaction
            iota.api.findTransactionObjects(searchValues, function(error, success) {
                if (error) {
                    console.error("error: ", error);
                } else {
                    if(success.length > 0){
                        console.log(success);
                        if(success[0].value >= parseInt(req.params.price)){
                            var senderBalance = getSenderAddress(iota, success[0].bundle);
                            if(parseInt(senderBalance) >= req.params.price){
                                res.send(true);
                            }else{
                                console.log("The payer has no funds.");
                                res.end();
                            }
                        } else {
                            res.end();
                        }
                    } else if(cancelRequest === true){
                        res.end();
                    } else {
                        console.log("no hashes found!");
                        check();
                    }
                }
            });

        },1000);
    }
    check();

});

module.exports = router;

//Find the address of the sender of the  payment
function getSenderAddress(iota, bundleHash){
    var bundles =[];
    bundles.push(bundleHash);
    var searchValues = {'bundles': bundles};
    iota.api.findTransactionObjects(searchValues, function(error, success) {
        for(i=0;i<success.length;i++){
            //The “value” key of the sender is negative.
            if(success[i].value < 0){
                return getSenderBalance(iota, success[i].address);
            }
        }
    });

}
//Get the balance of the found address of the sender
function getSenderBalance(iota, address) {
    var senderAddress = [];
    senderAddress.push(address);
    iota.api.getBalances(senderAddress, 100, function(error, success) {
        console.log("Balance: ", success.balances);
        return success.balances;
    });
}
