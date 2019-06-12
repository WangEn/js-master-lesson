function InterceptorManager() {
    this.handlers = [];
}

InterceptorManager.prototype.use = function ( resolve, reject ) {
    this.handlers.push({
        resolve: resolve,
        reject: reject
    });
}

export default InterceptorManager;