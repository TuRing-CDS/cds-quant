/**
 * Created by Z on 2017-03-22.
 */
function PARAM(paramName, opts) {
    let key = getKey("PARAM(", paramName, ',', opts, ")");
    this.params[paramName] = opts;
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            if (this.inputParams[paramName]) {
                return this.inputParams[paramName];
            }
            return opts.default || 0;
        }
        return value;
    }.bind(this);
}
module.exports = PARAM;