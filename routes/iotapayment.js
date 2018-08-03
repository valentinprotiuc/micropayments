var express = require('express');
var router = express.Router();

/* GET pictures. */
router.get('/', function (req, res, next) {
    console.log('got a request');
    var sa = require('superagent');
    sa.post('https://payiota.me/api.php')
        .send({
            api_key: '4f45dc749dd9498cba2c10a7cdb71a6414a70c473caf571af4ee895210eb69ff',
            currency: 'USD',
            price: '0.01',
            custom: 'hello',
            action: 'new'
        })
        .end(function (err, res) {
            console.log(res);
        });
});

module.exports = router;
/*

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
    }
};
xhttp.open("POST", "https://payiota.me/api.php", true);
xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
xhttp.send("api_key=[4f45dc749dd9498cba2c10a7cdb71a6414a70c473caf571af4ee895210eb69ff]&currency=[USD]&price=[0.01]&custom=[hello]&action=new");
*/