var express = require('express');
var request = require('request');
var router = express.Router();

/* GET pictures. */
router.get('/:picId.:price', function (req, res, next) {
    console.log('got a request');
    var fiatPrice = req.params.price;
    var customStr = req.params.picId;

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
            console.log('body: ', body);

        } else {
            res.send('sorry, error');
        }
    });



});

module.exports = router;
