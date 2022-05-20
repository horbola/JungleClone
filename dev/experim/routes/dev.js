var express = require('express');
var router = express.Router();

let baseDir = require('path').resolve('./');
let DataGenerator = require(baseDir + '/js/control/data-generator/data-generator');

/* home pages listing. */
router.get('/', function(req, res, next) {
  res.send('This is dev home panel. To get specific page add the page path after this url');
});

router.get('/tag-order', function(req, res, next) {
  res.render('dev/singlets/tag-order-a');
});

router.get('/chart-test', function(req, res, next) {
  res.render('dev/singlets/chart-test');
});


let dg = new DataGenerator();
router.get('/data', function(req, res, next) {
    res.json(dg.sendData());
});


module.exports = router;
