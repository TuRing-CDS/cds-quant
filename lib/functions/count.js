'use strict'
/**
 * COUNT
 * @param express
 * @param number
 * @returns {function(this:COUNT)}
 * @constructor
 */
function COUNT(express, number) {
    number = number || 5;
    let key = getKey("COUNT(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            if (0 == number) {
                number = this.kline.length;
            }
            let _temp = index - number + 1;
            let array = this.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            array.forEach(
                (item, itemIndex) => {
                    let sub = calculation.bind(this)(express, index - itemIndex);
                    if (true === !!sub) {
                        value++;
                    }
                }
            );
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
}

module.exports = COUNT;