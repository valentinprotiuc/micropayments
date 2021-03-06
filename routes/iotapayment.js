var express = require('express');
var request = require('request');
var router = express.Router();

/* Endpoint for IOTA invoice request */
router.get('/:picId-:price', function (req, res, next) {
    var fiatPrice = req.params.price;
    var customStr = req.params.picId;
    //Send request to PayIOTA server
    request.post({
        url: 'https://payiota.me/api.php',
        form: {
            api_key: '4f45dc749dd9498cba2c10a7cdb71a6414a70c473caf571af4ee895210eb69ff', currency: 'USD',
            price: fiatPrice,
            custom: customStr,
            action: 'new'
        }
    }, function (err, httpResponse, body) {
        if(err === null){
            res.send(body);
        } else {
            res.send('sorry, error');
        }
    });

});

module.exports = router;
