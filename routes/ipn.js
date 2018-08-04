var express = require('express');
var router = express.Router();
var payments = [];

/* Receives GET requests from the front-end and waits for confirmation */
router.get('/:address', function (req, res) {

    while(!payments.includes(req.address)){}
    res.send(true);

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
