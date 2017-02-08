'use strict'
/**
 * MAX
 * @returns {Function}
 * @constructor
 */
function MAX() {
    let args = [].slice.call(arguments);
    let key = getKey.apply(null, ['MAX('].concat(args.map((x) => {
        return getKey(x)
    }).join(',')).concat(')'));
    let self = this;
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            args.forEach((express) => {
                let temp = calculation.bind(this)(express, index);
                if (null == value) {
                    value = temp;
                }
                if (temp > value) {
                    value = temp;
                }
            });
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
};
module.exports = MAX;