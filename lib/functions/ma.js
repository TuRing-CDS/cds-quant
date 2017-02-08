/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function MA(express, number) {
    number = number || 5;
    let key = getKey("MA(", express, ',', number, ")");
    let self = this;
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let _temp = index - number + 1;
            let array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            let temp = 0;
            array.forEach((item, itemIndex) => {
                let sub = calculation.bind(this)(express, index - number + itemIndex + 1);
                if (sub) {
                    temp += sub;
                }
            });
            value = checkValue.bind(this)(key, index, temp / number);
        }
        return value;
    }.bind(this);
}

module.exports = MA;