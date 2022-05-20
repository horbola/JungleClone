// arguments

let Constants = require('./../../../constants');

let dataConfig = {
    clicks: {
        dataType: Constants.CLICKS,
        gross: 98403,
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
        gross: 3131,
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
        gross: 11755,
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
        gross: 11755,
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
        gross: 8,
        diviation: 100,
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
        gross: 2,
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
        gross: 8,
        diviation: 100,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    shipped: {
        dataType: Constants.SHIPPED,
        gross: 3917,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    returned: {
        dataType: Constants.RETURNED,
        gross: 183,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    shippedRev: {
        dataType: Constants.SHIPPED_REV,
        gross: 223301,
        diviation: 30,
        breakPoints: {
            0: 3,
            12: 1,
            16: 4,
            24: 2,
            28: 1
        }
    },
    bonus: {
        dataType: Constants.BONUS,
        gross: 27,
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
    value: Constants.JUN
});

Object.defineProperty(dataConfig, 'monthData', {
    value: require("./" + Constants.JUN)
});

Object.defineProperty(dataConfig, 'filePath', {
    value: Constants.BASE_DIR +
           Constants.DATA_DIR +
           Constants.I + Constants.LAST_YEAR +
           Constants.I + Constants.ALL +
           Constants.I + Constants.JUN +
           Constants.FILE_EXT
});



module.exports = dataConfig;


