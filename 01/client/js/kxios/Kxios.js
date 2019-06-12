import utils from './utils.js';
import InterceptorManager from './InterceptorManager.js';

// var obj1 = {x: 1, y:2, z: {a: 100, b: 200}, arr: [1,2,3]};
// var obj2 = utils.deepCopy(obj1);

// for (var key in obj1) {
//     obj2[key] = obj1[key];
// }

// obj2.z.a = 1000;
// console.log(obj1, obj2);



function Kxios(config) {
    
    // 初始化配置
    this.config = config;

    // 拦截器
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    }

}

Kxios.prototype.request = function(config) {

    // 请求需要的配置，把传入的config与this.config进行必要的合并

    var config = utils.mergeConfig( this.config, config );

    // console.log(config);


    /**
     * this.interceptors.request
     * this.dispatchRequest( config )
     * this.interceptors.response
     */

     // 调用链
    var chain = [this.dispatchRequest, undefined];

    // 循环取出请求拦截器内注册的所有函数
    /**
     * this.interceptors.request.handlers
     *  => [resove1, reject1, resove2, reject2]
     * 
     * chain = [resove2, reject2, resove1, reject1,this.dispatchRequest, undefined]
     */
    var requestHandlers = this.interceptors.request.handlers;
    var requestHandlersLen = requestHandlers.length;
    for (var i = 0; i < requestHandlersLen; i++) {
        chain.unshift( requestHandlers[i].resolve, requestHandlers[i].reject );
    }

    // 响应拦截器是向尾部添加
    /**
     * this.interceptors.response.handlers
     * [resove1, reject1, resove2, reject2]
     * chain = [resove2, reject2, resove1, reject1,this.dispatchRequest, undefined,resove1, reject1,resove2, reject2]
     */
    var responseHandlers = this.interceptors.response.handlers;
    var responseHandlersLen = responseHandlers.length;
    for (var i = 0; i < responseHandlersLen; i++) {
        chain.push( responseHandlers[i].resolve, responseHandlers[i].reject );
    }

    /**
     * 请求拦截器后注册的先执行
     * 响应拦截器先注册先执行
     */


    // 不去调用chain中的函数，而是创建一个新的resolve状态的promise
    // 作为整个调用的起始函数
    var promise = Promise.resolve(config);

    // 把chain中的所有函数添加promise对象的then中
    while (chain.length) {
        promise = promise.then( chain.shift(), chain.shift() );
    }
    // promise.then(f1).then(f2).then(f3)

    return promise;
}
Kxios.prototype.dispatchRequest = function(config) {
    var adapter = config.adapter;

    return adapter(config);
}

// 这4个请求方式都是不能带请求体
var method1 = ['delete', 'get', 'head', 'options'];


// method1.forEach( methodName => {
//     Kxios.prototype[methodName] = function(url, config) {
//         return this.request(utils.deepMerge(config || {}, {
//             method: methodName,
//             url: url
//         }));
//     }
// } );


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
// 下面3个都是可以带请求体的
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