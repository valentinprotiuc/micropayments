var express = require('express');
var path = require('path');
var router = express.Router();

/* GET pictures. */
router.get('/', function(req, res, next) {
    res.set({
        'Content-Type': 'picture/jpg',
        'Content-Disposition': 'attachment; filename=blue_small.jpg',
    });
    res.download(path.join(__dirname, '../pictures' , 'blue_small.jpg'));
});

module.exports = router;
