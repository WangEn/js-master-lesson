import Kxios from './Kxios.js';
import defaultsConfig from './defaultsConfig.js';
import utils from './utils.js';

function createInstance(conf) {
    var context = new Kxios(conf);

    var instance = utils.bind(Kxios.prototype.request, context);

    utils.extend(instance, Kxios.prototype.request, context);
    utils.extend(instance, context);

    return instance;
}

var axios = createInstance(defaultsConfig);

axios.create = function (conf) {
    return createInstance( utils.mergeConfig( defaultsConfig, conf ) );
}

export default axios;