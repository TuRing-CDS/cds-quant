'use strict'
/**
 * LOW
 * @returns {function(this:LOW)}
 * @constructor
 */
function LOW() {
    let key = getKey('LOW');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            value = checkValue.bind(this)(key, index, current.low);
        }
        return value;
    }.bind(this);
}

module.exports = LOW;