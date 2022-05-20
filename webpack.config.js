
// i must run this module before distribution so that the raw js files could get
// trnspiled to the the single js file. to run this file pass this command in prompt:-
//  "npm run build"

const path = require('path');

//module.exports = {
//    entry: {
//        home: './public/js/home/home.js'
//    },
//    output: {
//        filename: 'home.js',
//        path: path.resolve(__dirname, 'public/js/dist')
//    }
//};


module.exports = {
    mode: 'production',
    entry: {
        'js/page/home/asso-home': path.resolve(__dirname, 'views/page/home/asso-home/asso-home.js'),
        'js/page/home/visitor-home-2': path.resolve(__dirname, 'views/page/home/visitor-home-2/visitor-home-2.js'),
        'js/page/reports': path.resolve(__dirname, 'views/page/reports/reports.js'),
        'js/page/reports/tabs-frags/commissions_1': path.resolve(__dirname, 'views/page/reports/tabs-frags/commissions/commissions_1.js')
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    }
    
//    watch: true,
//    watchOptions: {
//        ignored: [
//            'bin/**',
//            'dev/**',
//            'dist/**',
//            'js/**',
//            'mbproject/**',
//            'node_modules/**',
//            'public/**',
//            'routes/**'
//        ]
//        aggregateTimeout: 200,
//         poll: 1000
//    }
};

