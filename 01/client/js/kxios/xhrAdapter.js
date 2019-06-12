export default function(config) {

    return new Promise(function(resolve, reject) {

        console.info('%c [adapter] : XMLHttpRequest', 'color:blue;font-size:20px;');

        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            // console.log(this);

            var responseData = {
                data: JSON.parse(this.responseText),
                status: this.status,
                statusText: this.statusText
            }

            resolve( responseData );
        }

        xhr.open( config.method , config.url, true);

        xhr.send();
    })

}