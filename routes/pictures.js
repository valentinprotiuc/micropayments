var express = require('express');
var path = require('path');
var router = express.Router();

/* Handle picture requests. */
router.get('/:picId', function(req, res, next) {
    var pictureName = req.params.picId + ".jpg";
    console.log(pictureName);
    //Set headers
    res.set({
        'Content-Type': 'picture/jpg',
        'Content-Disposition': 'attachment; filename=picture.jpg'
    });
    //Force a download of the picture
    res.download(path.join(__dirname, '../pictures', pictureName));
});

module.exports = router;
