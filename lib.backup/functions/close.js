'use strict'
/**
 * CLOSE
 * @returns {function(this:CLOSE)}
 * @constructor
 */
function CLOSE() {
    let key = getKey('CLOSE');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            value = checkValue.bind(this)(key, index, current.close);
        }
        return value;
    }.bind(this);
}

module.exports = CLOSE;