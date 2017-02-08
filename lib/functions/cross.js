'use strict'
/**
 * CROSS
 * @param express
 * @param express2
 * @returns {function(this:CROSS)}
 * @constructor
 */
function CROSS(express, express2) {
    let key = getKey("CROSS(", express, ',', express2, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index];
            let result;
            let expvc1 = calculation.bind(this)(express, index);
            let expvl1 = calculation.bind(this)(express, index - 1);
            let expvc2 = calculation.bind(this)(express2, index);
            let expvl2 = calculation.bind(this)(express2, index - 1);
            if (expvl1 < expvl2 && expvc1 > expvc2) {
                value = 1;//上穿成功
            } else {
                value = 0;//上穿失败
            }
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this)
};
module.exports = CROSS;