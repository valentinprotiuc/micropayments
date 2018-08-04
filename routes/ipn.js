var express = require('express');
var router = express.Router();
var payments = [];

/* Receives GET requests from the front-end and waits for confirmation */
router.get('/:address', function (req, res) {

    var cancelRequest = false;

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
    check();

});

/* Receives POST requests from PayIOTA with payment confirmation*/
router.post('/', function (req, res) {
    if(req.done === '1'){
        payments.push(req.address);
        res.end();
    } else {
        res.end();
    }
});

module.exports = router;
