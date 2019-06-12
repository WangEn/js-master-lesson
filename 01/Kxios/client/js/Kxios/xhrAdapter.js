export default function(config) {
    return new Promise( function(resolve, reject) {
        console.info('%c [adapter] : XMLHttpRequest', 'color:blue;font-size:20px;');
        var xhr = new XMLHttpRequest();
    
        xhr.onload = function () {
    
            if (config.validateStatus(xhr.status)) {
                var responseData = xhr.responseText;
    
                resolve({
                    data: responseData,
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            } else {
                reject({
                    message: 'Request failed with status code ' + xhr.status
                });
            }
            
            xhr = null;
        }
    
        xhr.onerror = function () {
            reject({
                message: 'Network Error'
            });
    
            xhr = null;
        }
    
        xhr.open(config.method, config.url, true);
    
        if (config.data === undefined) {
            config.data = null;
        }
    
        xhr.send(config.data);
    } );
}