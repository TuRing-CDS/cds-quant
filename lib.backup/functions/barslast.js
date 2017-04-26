'use strict'
/**
 * BARSLAST
 * @param express
 * @returns {function(this:BARSLAST)}
 * @constructor
 */
function BARSLAST(express) {
    let key = getKey("BARSLAST(", express, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let temp = calculation.bind(this)(express, index);
            if (temp) {
                value = 0;
            } else {
                value = this.datas[index - 1] ? this.datas[index - 1][key] + 1 : 1;
            }
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
}

module.exports = BARSLAST;