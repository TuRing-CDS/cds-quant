/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function BARSLAST(express) {
    let key = getKey("BARSLAST(", express, ")");
    let self = this;
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let temp = calculation.bind(this)(express, index);
            if (temp) {
                value = 0;
            } else {
                value = self.datas[index - 1] ? self.datas[index - 1][key] + 1 : 1;
            }
            value = checkValue.bind(this)(key, index, value);
        }
        return value;
    }.bind(this);
}

module.exports = BARSLAST;