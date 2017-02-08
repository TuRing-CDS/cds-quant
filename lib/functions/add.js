'use strict'
/**
 * ADD +
 * @param express
 * @param express2
 * @returns {function(this:ADD)}
 * @constructor
 */
function ADD(express, express2) {
    let key = getKey("ADD(", express, ',', express2, ")");
    if (this.isMath) {
        key = getKey('(', express, ' + ', express2, ')');
    }
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            let v1 = calculation.bind(this)(express, index);
            let v2 = calculation.bind(this)(express2, index);
            value = checkValue.bind(this)(key, index, v1 + v2);
        }
        return value;
    }.bind(this);
}

module.exports = ADD;