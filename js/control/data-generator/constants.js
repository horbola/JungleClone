// constants


function Constants(){}

// stall's names
Constants.STALL_00 = 'stall-00';
Constants.STALL_01 = 'stall-01';
Constants.STALL_02 = 'stall-02';
Constants.STALL_03 = 'stall-03';
Constants.STALL_04 = 'stall-04';
Constants.STALL_05 = 'stall-05';
Constants.STALL_06 = 'stall-06';
Constants.STALL_07 = 'stall-07';
Constants.STALL_08 = 'stall-08';
Constants.STALL_09 = 'stall-09';
Constants.STALL_10 = 'stall-10';
Constants.STALL_11 = 'stall-11';
Constants.STALL_12 = 'stall-12';
Constants.STALL_13 = 'stall-13';
Constants.STALL_14 = 'stall-14';
Constants.STALL_15 = 'stall-15';
Constants.STALL_16 = 'stall-16';

Constants.CURRENT_YEAR = 'current-year';
Constants.LAST_YEAR = 'last-year';



// all stall names so that we can iterate on it.
Constants.stallNames = [
    Constants.STALL_00,
    Constants.STALL_01,
    Constants.STALL_02,
    Constants.STALL_03,
    Constants.STALL_04,
    Constants.STALL_05,
    Constants.STALL_06,
    Constants.STALL_07,
    Constants.STALL_08,
    Constants.STALL_09,
    Constants.STALL_10,
    Constants.STALL_11,
    Constants.STALL_12,
    Constants.STALL_13,
    Constants.STALL_14,
    Constants.STALL_15,
    Constants.STALL_16
];



// month's names
Constants.JAN = 'jan';
Constants.FEB = 'feb';
Constants.MAR = 'mar';
Constants.APR = 'apr';
Constants.MAY = 'may';
Constants.JUN = 'jun';
Constants.JUL = 'jul';
Constants.AUG = 'aug';
Constants.SEP = 'sep';
Constants.OCT = 'oct';
Constants.NOV = 'nov';
Constants.DEC = 'dec';



// all month names so that we can iterate on it.
Constants.monthNames = [
    Constants.JAN,
    Constants.FEB,
    Constants.MAR,
    Constants.APR,
    Constants.MAY,
    Constants.JUN,
    Constants.JUL,
    Constants.AUG,
    Constants.SEP,
    Constants.OCT,
    Constants.NOV,
    Constants.DEC
];


// all month names so that we can iterate on it.
Constants.configFileNames = [
    Constants.JAN + Constants.CONFIG_FILE_EXT,
    Constants.FEB + Constants.CONFIG_FILE_EXT,
    Constants.MAR + Constants.CONFIG_FILE_EXT,
    Constants.APR + Constants.CONFIG_FILE_EXT,
    Constants.MAY + Constants.CONFIG_FILE_EXT,
    Constants.JUN + Constants.CONFIG_FILE_EXT,
    Constants.JUL + Constants.CONFIG_FILE_EXT,
    Constants.AUG + Constants.CONFIG_FILE_EXT,
    Constants.SEP + Constants.CONFIG_FILE_EXT,
    Constants.OCT + Constants.CONFIG_FILE_EXT,
    Constants.NOV + Constants.CONFIG_FILE_EXT,
    Constants.DEC + Constants.CONFIG_FILE_EXT
];


// type's name
Constants.CLICKS = 'clicks';
Constants.ORDERED_ITEM = 'ordered_items';
Constants.SELL_EARNINGS = 'sell_earnings';
Constants.COMMISSIONS = 'commissions';
Constants.BOUNTIES = 'bounties';
Constants.REFERRALS = 'referrals';
Constants.REFERRAL_EARNINGS = 'referral_earnings';
Constants.SHIPPED = 'shipped';
Constants.RETURNED = 'returned';
Constants.CONVERSION = 'conversion';
Constants.SHIPPED_REV = 'shippedRev';
Constants.BONUS = 'bonus';

// paths
Constants.I = '/';
Constants.BASE_DIR = require('path').resolve('./');
Constants.DATA_DIR_TEST = '/js/model/generated-data';
Constants.DATA_DIR_ORIG = '/views/lib/js/chart/data';
Constants.DATA_DIR = Constants.DATA_DIR_ORIG;
Constants.DATA_CONFIG_DIR = './data-config';
Constants.STALL_DIR = '/last-year/all';
Constants.FILE_EXT = '.js';
Constants.CONFIG_FILE_EXT = '-config';


module.exports = Constants;

