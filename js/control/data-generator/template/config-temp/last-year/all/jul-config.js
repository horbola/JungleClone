// arguments

let Constants = require('./../../../constants');

let dataConfig = {
    clicks: {
        dataType: Constants.CLICKS,
        gross: 50091,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    ordered_items: {
        dataType: Constants.ORDERED_ITEM,
        gross: 4262,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    sell_earnings: {
        dataType: Constants.SELL_EARNINGS,
        gross: 18852,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    commissions: {
        dataType: Constants.COMMISSIONS,
        gross: 18852,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    bounties: {
        dataType: Constants.BOUNTIES,
        gross: 20,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    referrals: {
        dataType: Constants.REFERRALS,
        gross: 30,
        diviation: 100,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    referral_earnings: {
        dataType: Constants.REFERRAL_EARNINGS,
        gross: 100,
        diviation: 100,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    }
};

Object.defineProperty(dataConfig, 'monthName', {
    value: Constants.JUL
});

Object.defineProperty(dataConfig, 'monthData', {
    value: require("./" + Constants.JUL)
});

Object.defineProperty(dataConfig, 'filePath', {
    value: Constants.BASE_DIR +
           Constants.DATA_DIR +
           Constants.I + Constants.LAST_YEAR +
           Constants.I + Constants.ALL +
           Constants.I + Constants.JUL +
           Constants.FILE_EXT
});



module.exports = dataConfig;


