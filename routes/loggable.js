
var express = require('express');
var router = express.Router();



// this is a template for those pages which are
// required to logged in in advance to go.
router.get('url here', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page path here', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - '
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: 'orig url here'
        });
    }
});







router.get('/home/productlinks/search', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/product-links-search/product-links-search', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Product links'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/productlinks/search'
        });
    }
});

router.get('/home/bannerlinks', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/bannerlinks/bannerlinks', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Banner links'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/bannerlinks'
        });
    }
});
			
router.get('/home/reports', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/reports/reports', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Home and Reports'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/reports'
        });
    }
});

router.get('/home', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/home/asso-home/asso-home', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Home'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home'
        });
    }
});









// ===================================================
router.get('/home/tools/mobilepopover', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/mobile-popover/mobile-popover', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Mobile Popover'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/tools/mobilepopover'
        });
    }
});

router.get('/home/textlink/general', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/textlink-general/textlink-general', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Link To Any Page'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/textlink/general'
        });
    }
});
router.get('/p/ideahub/home', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/ideahub-home/ideahub-home', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Idea Hub'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/p/ideahub/home'
        });
    }
});

router.get('/home/bounties', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/bounties/bounties', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Amazon Bounty Program'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/bounties'
        });
    }
});

router.get('/home/promohub/promocodes', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/promohub-promocodes/promohub-promocodes', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Amazon Promo Codes'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/promohub/promocodes'
        });
    }
});

router.get('/home/textlink/sitestripe', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/textlink-sitestripe/textlink-sitestripe', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - SiteStripe'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/textlink/sitestripe'
        });
    }
});

router.get('/home/tools/linkchecker', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/link-checker/link-checker', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Link Checker'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/tools/linkchecker'
        });
    }
});

router.get('/assoc_credentials/home', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/assoc-credentials-home/assoc-credentials-home', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Product Advertising API'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/assoc_credentials/home'
        });
    }
});

router.get('/onelink', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/onelink/onelink', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - OneLink'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/onelink'
        });
    }
});

router.get('/onelink/tag/map', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/onelink-tag-map/onelink-tag-map', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Link Your Accounts'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/onelink/tag/map'
        });
    }
});

router.get('/home/reports/global', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/reports-global/reports-global', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Earning Reports'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/reports/global'
        });
    }
});

router.get('/help/forum', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/help-forum/help-forum', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Discussion Boards'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/help/forum'
        });
    }
});

router.get('/help/forum', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/help-forum/help-forum', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Discussion Boards'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/help/forum'
        });
    }
});

router.get('/home/account/payment/history', function(req, res, next) {
    if (req.app.locals.loggedIn) {
        res.render('page/loggable/payment-history/payment-history', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon.com Associates Central - Payment History'
        });
    } else {
        res.render('page/ap/signin-a', {
            appUrl: req.app.locals.appUrl,
            jsRes: req.app.locals.jsRes,
            title: 'Amazon Sign-In',
            origUrl: '/home/account/payment/history'
        });
    }
});




module.exports = router;
