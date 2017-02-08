/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function LLV(express, number) {
    number = number || 5;
    let key = getKey("LLV(", express, ',', number, ")");
    let self = this;
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            value = Infinity;
            let _temp = index - number + 1;
            let array = this.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            array.forEach((item, itemIndex) => {
                let sub = calculation.bind(this)(express, index - itemIndex);
                if (sub < value) {
                    value = sub;
                }
            });
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
}

module.exports = LLV;