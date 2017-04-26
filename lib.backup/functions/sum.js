/**
 * Created by Z on 2017-01-03.
 */
'use strict'
function SUM(express, number) {
    number = number || 5;
    let key = getKey("SUM(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let _temp = index - number + 1;
            let array = this.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            array.forEach((item, itemIndex) => {
                    value += calculation.bind(this)(express, index - itemIndex);
                }
            );
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
};

module.exports = SUM;