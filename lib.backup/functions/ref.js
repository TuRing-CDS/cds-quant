'use strict'
/**
 * REF
 * @param express
 * @param number
 * @returns {function(this:REF)}
 * @constructor
 */
function REF(express, number) {
    number = number || 5;
    let key = getKey("REF(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            if (index < number - 1) {
                return 0;
            }
            value = calculation.bind(this)(express, index - 1);
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
};

module.exports = REF;