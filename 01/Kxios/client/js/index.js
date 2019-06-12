import kxios from './Kxios/index.js';
import fetchAdapter from './Kxios/fetchAdapter.js';

console.dir(kxios);

// kxios.request({
//     data: { x: 1, y: 2 },
//     headers: {
//         'content-type': 'text/html'
//     }
// });

kxios.interceptors.request.use(function (config) {
    console.log('request 拦截器1', config);
    // config.url = 'http://www.baidu.com';
    return config;
});
kxios.interceptors.request.use(function (config) {
    console.log('request 拦截器2', config);
    return config;
})
kxios.interceptors.response.use(function (res) {
    console.log('response 拦截器1');
    return res;
})
kxios.interceptors.response.use(function (res) {
    console.log('response 拦截器2');
    return res;
})

// kxios({
//     url: '/'
// }).then(function (res) {
//     console.log('res', res);
// });

// kxios.request({
//     url: '/'
// }).then(function (res) {
//     console.log('res', res);
// }, function (err) {
//     console.log('err', err);
// });


// kxios.get('/').then(function (res) {
//     console.log('res', res)
// });


// kxios({
//     // method: 'get',
//     url: '/'
// });

let instance1 = kxios.create({
    adapter: function(config) {
        return fetchAdapter(config);
    }
});

instance1.get('http://localhost:7777/data').then(function (res) {
    console.log(res);
})