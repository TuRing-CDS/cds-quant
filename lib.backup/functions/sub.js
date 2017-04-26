'use strict'
/**
 * SUB
 * @param express
 * @param express2
 * @returns {function(this:SUB)}
 * @constructor
 */
function SUB(express, express2) {
    let key = getKey("SUB(", express, ',', express2, ")");
    if (this.isMath) {
        key = getKey('(', express, ' - ', express2, ')');
    }
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let v1 = calculation.bind(this)(express, index);
            let v2 = calculation.bind(this)(express2, index);
            value = checkValue.bind(this)(key, index, v1 - v2);
        }
        return value;
    }.bind(this);
}

module.exports = SUB;