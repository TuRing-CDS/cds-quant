'use strict'
/**
 * HIGH
 * @returns {function(this:HIGH)}
 * @constructor
 */
function HIGH() {
    let key = getKey('HIGH');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            value = checkValue.bind(this)(key, index, current.high);
        }
        return value;
    }.bind(this);
}

module.exports = HIGH;