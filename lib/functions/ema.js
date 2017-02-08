/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function EMA(express, number) {
    number = number || 5;
    let key = getKey("EMA(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let temp = calculation.bind(this)(express, index);
            let _y = (index <= 0 ? 0 : this.datas[index - 1][key]) || temp;
            value = checkValue.bind(this)(key, index, ( 2 * temp + ( number - 1 ) * _y ) / ( number + 1 ));
        }
        return value;
    }.bind(this);
}
module.exports = EMA;