'use strict';
/**
 * ABS
 * @param express
 * @returns {function(this:ABS)}
 * @constructor
 */
function ABS(express) {
    let key = getKey("ABS(", express, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            value = checkValue.bind(this)(key, index, Math.abs(calculation.bind(this)(express, index)));
        }
        return value;
    }.bind(this);
}

module.exports = ABS;