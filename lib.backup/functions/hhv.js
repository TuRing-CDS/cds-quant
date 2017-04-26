'use strict'
/**
 * HHV
 * @param express
 * @param number
 * @returns {Function}
 * @constructor
 */
function HHV(express, number) {
    number = number || 5;
    let key = getKey("HHV(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let _temp = index - number + 1;
            let array = this.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            array.forEach((item, itemIndex) => {
                let sub = calculation.bind(this)(express, index - itemIndex);
                if (sub > value) {
                    value = sub;
                }
            });
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
}

module.exports = HHV;