import Kxios from './Kxios.js';
import defaultConfig from './defaultConfig.js';
import utils from './utils.js';


function createInstance(config) {
    var context = new Kxios(config);

    var request = utils.bind(Kxios.prototype.request, context);

    utils.extend(request, Kxios.prototype, context);
    utils.extend(request, context);

    return request;
}

var kxios = createInstance(defaultConfig);

kxios.create = function(config) {
    return createInstance(config);
}

export default kxios;