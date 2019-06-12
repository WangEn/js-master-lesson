// import Kxios from './kxios/Kxios.js';

// var kxios = new Kxios({
//     // baseUrl: 'http://localhost:7777',
//     // headers: {
//     //     x: 1
//     // }
// });

// console.log( kxios );

// kxios.interceptors.request.use(function(config) {
//     // console.log(config);
//     console.log('request1');
//     return config;
// });
// kxios.interceptors.request.use(function(config) {
//     // console.log(config);
//     console.log('request2');
//     // return new Promise(function(resolve) {
//     //     setTimeout(function() {
//     //         resolve();
//     //     }, 3000);
//     // })
//     return config;
// });

// kxios.interceptors.response.use(function(res) {
//     // console.log(res);
//     console.log('response1');
//     return res;
// });
// kxios.interceptors.response.use(function(res) {
//     // console.log(res);
//     console.log('response2');
//     // if (res.data.code != 0) {
//     //     alert();
//     // }
//     return res;
// });

// kxios.request({
//     method: 'get',
//     url: 'http://localhost:7777/data'
// }).then( function(res) {
//     console.log(res);

    
// } );

// kxios.request({
//     method: 'get',
//     url: '/data'
// });




// Promise.resolve(123).then(function(v) {
//     console.log(v);
//     return v;
// }).then(function(v) {
//     console.log(v);
// })



// kxios.get('http://localhost:7777/data').then(function(res) {
//     console.log(res);
// });


import kxios from './kxios/index.js';
import fetchAdapter from './kxios/fetchAdapter.js';
import xhrAdapter from './kxios/xhrAdapter.js';
// import jsonpAdapter from './kxios/jsonpAdapter.js';

// console.dir(kxios.config);

kxios.config.adapter = function(config) {
    return xhrAdapter(config);
}

kxios.get('http://localhost:7777/data').then(function(res) {
    console.log(res);
});

// kxios({
//     url: 'http://localhost:7777/data'
// }).then(function(res) {
//     console.log(res);
// });


// let kxios2 = kxios.create({
//     baseURL: 'http://www2.com'
// });
// kxios2.get();


