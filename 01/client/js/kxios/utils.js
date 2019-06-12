function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
function isObject(val) {
    return typeof val === 'object' && val !== null;
}

function deepCopy(obj2) {
    /**
     * 把一个对象递归拷贝给另外一个对象
     * 源对象与拷贝后的对象没有引用关系
     */
    var obj = isArray(obj2) ? [] : {};
    for (var property in obj2) {
        // 如果当前拷贝的数据还是一个对象的话，那么继续调用
        // deepCopy 进行二次拷贝
        // 递归
        if (isObject(obj2[property])) {
            obj[property] = deepCopy(obj2[property]);
        } else {
            obj[property] = obj2[property];
        }
    }
    return obj;
}

function deepMerge(obj1, obj2) {
    var obj = deepCopy(obj1);

    for (var property in obj2) {
        var val = obj[property];
        var val2 = obj2[property];
        if ( isObject(val) && isObject(val2)) {
            obj[property] = deepMerge(val, val2);
        } else if (isObject(val2)) {
            obj[property] = deepCopy(val2);
        } else {
            obj[property] = val2;
        }
    }

    return obj;
}

function mergeConfig(config1, config2) {

    /**
     * 注意：
     *  不能直接把config2合并到config1中
     * 
     * 1. 把config1先通过深拷贝赋值给一个新的对象
     */
    var config = deepCopy(config1);


    var properties1 = ['url', 'method', 'params', 'data'];

    // 把config2合并到config
    for (var property in config2) {

        // 针对一些没有必要合并的配置直接赋值
        if ( properties1.indexOf(property) != -1 ) {
            config[property] = config2[property];
        } else {
            if (isObject(config2[property])) {
                // merge
                config[property] = deepMerge(config[property], config2[property]);
            } else {
                config[property] = config2[property];
            }
        }

    }

    return config;
}

function bind(fn, context) {
    return function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return fn.apply(context, args);
    }
}

function extend(obj1, obj2, context) {
    for (var property in obj2) {
        if (typeof obj2[property] === 'funtion') {
            obj1[property] = bind(obj2[property], context);
        } else {
            obj1[property] = obj2[property];
        }
    }
}

export default {
    isArray,
    isObject,
    deepCopy,
    deepMerge,
    mergeConfig,
    bind,
    extend
};