'use strict'
/**
 *  AVERAGE
 * @param express
 * @param number
 * @returns {function(this:AVERAGE)}
 * @constructor
 */
function AVERAGE(express, number) {
    let key = getKey("AVERAGE(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null == value) {
            if (0 == number) {
                number = this.kline.length;
            }
            let _temp = index - number + 1;
            let array = this.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            let temp = [];
            let total = 0;
            let tempTotal = 0;
            array.forEach((item, itemIndex) => {
                let sub = calculation.bind(this)(express, index - itemIndex);
                total += sub;
                temp.push(sub);
            });
            temp.forEach(function (item) {
                tempTotal += Math.abs((item - (total / number)));
            });
            value = checkValue.bind(this)(key, index, tempTotal / number);
        }
        return value;
    }.bind(this);
}

module.exports = AVERAGE;