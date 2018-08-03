var express = require('express');
var path = require('path');
var router = express.Router();

/* GET pictures. */
router.get('/:picId', function(req, res, next) {
    var pictureName = req.params.picId + ".jpg";
    console.log(pictureName);
    res.set({
        'Content-Type': 'picture/jpg',
        'Content-Disposition': 'attachment; filename=picture.jpg'
    });
    res.download(path.join(__dirname, '../pictures', pictureName));
});

module.exports = router;
