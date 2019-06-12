import utils from './utils.js';
import InterceptorManager from './InterceptorManager.js';

// var obj1 = { x: 1, y: { a: 1, b: 2 }, z: 3 };
// var obj2 = { n: 100, m: 200, y: {c: 300} };

// var obj3 = utils.deepMerge(obj1, obj2);
// obj3.y.c = 1000;
// console.log(obj1, obj2, obj3);

function Kxios(config) {
    this.config = config;

    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    }
}

Kxios.prototype.request = function (config) {
    
    var config = utils.mergeConfig(this.config, config);

    // console.log(config);

    // 调用链
    var chain = [this.dispatchRequest, undefined];

    var promise = Promise.resolve(config);

    var requestHandlers = this.interceptors.request.handlers;
    var requestHandlersLen = requestHandlers.length;
    for (var i = 0; i < requestHandlersLen; i++) {
        chain.unshift( requestHandlers[i].resolve, requestHandlers[i].reject );
    }

    var responseHandlers = this.interceptors.response.handlers;
    var responseHandlersLen = responseHandlers.length;
    for (var i = 0; i < responseHandlersLen; i++) {
        chain.push( responseHandlers[i].resolve, responseHandlers[i].reject );
    }

    while (chain.length) {
        promise = promise.then( chain.shift(), chain.shift() );
    }

    return promise;
    // return this.dispatchRequest(config);
}

Kxios.prototype.dispatchRequest = function (config) {
    var adapter = config.adapter;

    return adapter(config).then(function(res) {
        var transformResponse = config.transformResponse;
        for (var i = 0; i < transformResponse.length; i++) {
            res.data = transformResponse[i](res.data);
        }
        return res;
    });
}

var method1 = ['delete', 'get', 'head', 'options'];
for (var i = 0; i < method1.length; i++) {
    (function (i) {
        var methodName = method1[i];
        Kxios.prototype[methodName] = function (url, config) {
            return this.request(utils.deepMerge(config || {}, {
                method: methodName,
                url: url
            }));
        }
    })(i)
}
var method2 = ['post', 'put', 'patch'];
for (var i = 0; i < method2.length; i++) {
    (function (i) {
        var methodName = method2[i];
        Kxios.prototype[methodName] = function (url, data, config) {
            return this.request(utils.deepMerge(config || {}, {
                method: methodName,
                url: url,
                data: data
            }));
        }
    })(i)
}

export default Kxios;