'use strict'
/**
 * MUL
 * @param express
 * @param express2
 * @returns {Function}
 * @constructor
 */
function MUL(express, express2) {
    let key = getKey("MUL(", express, ',', express2, ")");
    if (this.isMath) {
        key = getKey('(', express, ' * ', express2, ')');
    }
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let v1 = calculation.bind(this)(express, index);
            let v2 = calculation.bind(this)(express2, index);
            value = checkValue.bind(this)(key, index, v1 * v2);
        }
        return value;
    }.bind(this);
}

module.exports = MUL;