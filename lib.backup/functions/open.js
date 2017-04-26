'use strict'
/**
 * OPEN
 * @returns {function(this:OPEN)}
 * @constructor
 */
function OPEN() {
    let key = getKey('OPEN');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            value = checkValue.bind(this)(key, index, current.open);
        }
        return value;
    }.bind(this);
}

module.exports = OPEN;