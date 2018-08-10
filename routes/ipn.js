var express = require('express');
var request = require('request');
var IOTA = require('iota.lib.js/lib/iota');
var router = express.Router();
var payments = [];


/* Receives GET requests from the front-end and waits for confirmation */
router.get('/:address-:price', function (req, res) {

    var iota = new IOTA({
        'provider': 'http://188.68.60.136:14265'
    });

    var cancelRequest = false;

    var address = [];
    address.push(req.params.address);

    var searchValues = {'addresses': address};

    req.on('aborted', function (){
        cancelRequest = true;
    });

    function check(){
        setTimeout(function () {

            iota.api.findTransactionObjects(searchValues, function(error, success) {
                if (error) {
                    console.error("error: ", error);
                } else {
                    if(success.length > 0){
                        if(success[0].value >= parseInt(req.params.price)){
                            res.send(true);
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






    /*
        var command = {
            'command': 'findTransactions',
            'addresses': ['KEXTUBVRIMFAQPHW9PNQKCZFW9SBKCDYFH9LEQXMIZLCMUKGLNZWWJIOVSRLCQHZHCIOVFYOELRGMZN9XGUWYMKITW']
        };

        var options = {
            url: 'http://173.249.16.50:14265',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-IOTA-API-Version': '1',
                'Content-Length': Buffer.byteLength(JSON.stringify(command))
            },
            json: command
        };

        console.log("reqqq");
        request(options, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log(data);
            } else {
                console.log(response);
            }
        });


        /*var cancelRequest = false;

        req.on('close', function (err){
            cancelRequest = true;
        });

        //Waiting function for the confirmation
        function check(){
            setTimeout(function () {
                if(payments.includes(req.params.address)){
                    res.send(true);
                } else if(cancelRequest === false) {
                    check();
                }
            },500);
        }
        check();*/

});

/* Receives POST requests from PayIOTA with payment confirmation
router.post('/', function (req, res) {
    console.log("ipn received");
    console.log("request: ", req);
    if(req.done === '1'){
        console.log("tx confirmed");
        payments.push(req.address);
        console.log("after push: ", payments);
        res.end();
    } else {
        res.end();
    }
});*/

module.exports = router;
