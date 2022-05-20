
var express = require('express');
var router = express.Router();


var DataGenController = require('./../js/control/data-generator/data-gen-controller');
router.get('/admin/update-data', function(req, res, next) {
    res.render('page/admin/update-data/update-data-a', {
        appUrl: req.app.locals.appUrl,
        title: 'Update Data',
        jsRes: req.app.locals.jsRes,
        updataDataComInit: false
    });
});


router.get('/admin/update-data-command', function(req, res, next) {
    let dataGenContr = new DataGenController();
    dataGenContr.genStallData();
//    npmRun();
    res.redirect(req.app.locals.appName + '/admin/update-data');
});


function npmRun(){
    var child_process = require('child_process');
    child_process.execSync('npm run build', {stdio: [0, 1, 2]});
}
//function npmRun(){
//    npm.load(function (err) {
//        // handle errors
//
//        // install module ffi
//        npm.commands.run(['build'], function (er, data) {
//            // log errors or data
//        });
//
//        npm.on('log', function (message) {
//            // log installation progress
//            console.log(message);
//        });
//    });
//}




module.exports = router;
