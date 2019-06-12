export default function(config) {
    return new Promise(function(resolve, reject) {// 实际可以不需要这一层Promise，这里为了测试输出

        console.info('%c [adapter] : Fetch', 'color:blue;font-size:20px;');

        var responseData = {};
        return fetch(config.url, {
            method: config.method
        }).then(function(res) {
            responseData = {
                status: res.status,
                statusText: res.statusText
            };
            return res.json();
        }, function(err) {
            reject(err);
        }).then(function(data) {
            responseData.data = data;
            resolve(responseData);
        });
    });
}