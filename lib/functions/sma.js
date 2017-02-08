'use strict'
/***
 * SMA
 * @param express
 * @param number
 * @param weight
 * @returns {Function}
 * @constructor
 */
function SMA(express, number, weight) {
    number = number || 5;
    weight = weight || 1;
    let key = getKey("SMA(", express, ',', number, ',', weight, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key,index);
        if(null === value){
            let temp = calculation.bind(this)(express,index)
            let _y = ( index < 1 ? 0 : this.datas[index - 1][key] ) || temp;
            value = checkValue.bind(this)(key,index,(temp * weight + ( number - weight ) * _y ) / number);
        }
        return value;
    }.bind(this);
};
module.exports = SMA;