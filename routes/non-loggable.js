
var express = require('express');
var router = express.Router();

//var Data = require('./../js/model/data/data');
//data = new Data();



/* GET reports page. */
router.get('/job', function(req, res, next) {
  res.render('page/job/job', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'job page'
    });
});





/* GET home-before page. */
router.get('/vhome', function(req, res, next) {
  res.render('page/home/visitor-home/visitor-home', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central'
    });
});

/* GET home-before page. */
router.get('/vhome2', function(req, res, next) {
  res.render('page/home/visitor-home-2/visitor-home-2', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central'
    });
});




router.get('/home/reports/sum-frags', function(req, res, next) {
    res.render('page/reports/tabs-frags/summary/summary', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'summary'
    });
});

router.get('/home/reports/com-frags', function(req, res, next) {
    res.render('page/reports/tabs-frags/commissions/commissions', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'commissions'
    });
});

router.get('/home/reports/boun-frags', function(req, res, next) {
    res.render('page/reports/tabs-frags/bounties/bounties', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'bounties'
    });
});




router.get('/data', function(req, res, next) {
    // let dataRange = req.dataRange;
    let dataRange = {
        pastMonth: 'jan',
        pastMonthInd: 0,
        pastMonthStart: 1,

        currMonth: 'dec',
        currMonthInd: 11,
        currMonthEnd: '31',
        start: 1,
        count: 5,
        get end() {
            return this.start + this.count;
        },
        sevMons: false,

        selectedStall: 0,
        lastYear: false
    };
    
    res.json(data.getDataSet(req.query.dataItemRange));
});




router.get('/', function(req, res, next) {
    res.render('page/home/visitor-home-2/visitor-home-2', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central'
    });
});










//==================================================
router.get('/home/ads', function(req, res, next) {
    res.render('page/non-loggable/native-shopping-ads/native-shopping-ads', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Native Shopping Ads'
    });
});

router.get('/help/node', function(req, res, next) {
    res.render('page/non-loggable/help-node/help-node', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Product Help'
    });
});

router.get('/resource-center', function(req, res, next) {
    res.render('page/non-loggable/resource-center/resource-center', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Resource Center'
    });
});

router.get('/help/operating/agreement', function(req, res, next) {
    res.render('page/non-loggable/operating-agreement/operating-agreement', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Operating Agreement'
    });
});

router.get('/help/node/topic/GRXPHT8U84RAYDXZ', function(req, res, next) {
    res.render('page/non-loggable/node-topic-GRXPHT8U84RAYDXZ/node-topic-GRXPHT8U84RAYDXZ', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Commission Income Statement'
    });
});

router.get('/help/operating/policies', function(req, res, next) {
    res.render('page/non-loggable/operating-policies/operating-policies', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Program Policies'
    });
});

router.get('/contact', function(req, res, next) {
    res.render('page/non-loggable/contact/contact', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Contact us'
    });
});

router.get('/help/node/topic/202102870', function(req, res, next) {
    res.render('page/non-loggable/node-topic-202102870/node-topic-202102870', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Amazon Trade-in Program'
    });
});

router.get('/help/node/topic/202049570', function(req, res, next) {
    res.render('page/non-loggable/node-topic-202049570/node-topic-202049570', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - '
    });
});

router.get('/help/node/topic/GAMMZFYWCKP8SZA6', function(req, res, next) {
    res.render('page/non-loggable/node-topic-GAMMZFYWCKP8SZA6/node-topic-GAMMZFYWCKP8SZA6', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - '
    });
});

router.get('/node/topic/GRXPHT8U84RAYDXZ-footer', function(req, res, next) {
    res.render('page/non-loggable/node-topic-GRXPHT8U84RAYDXZ-footer/node-topic-GRXPHT8U84RAYDXZ-footer', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Commission Schedule'
    });
});

router.get('/home/account/payment/history', function(req, res, next) {
    res.render('page/non-loggable//', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - Payment History'
    });
});

router.get('/resource-center/receive-your-international-affiliate-earnings-in-your-local-bank', function(req, res, next) {
    res.render('page/non-loggable/receive-your-earnings/receive-your-earnings', {
        appUrl: req.app.locals.appUrl,
        jsRes: req.app.locals.jsRes,
        title: 'Amazon.com Associates Central - '
    });
});







module.exports = router;
