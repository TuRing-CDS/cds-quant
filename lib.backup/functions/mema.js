'use strict'
/**
 * MEMA
 * @param express
 * @param number
 * @returns {function(this:MEMA)}
 * @constructor
 */
function MEMA(express, number) {
    number = number || 5;
    let key = getKey("MEMA(", express, ',', number, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let temp = calculation.bind(this)(express, index);
            let _y = ( index < 1 ? 0 : this.datas[index - 1][key] ) || temp;
            value = checkValue.bind(this)(key, index, (temp + ( number - 1 ) * _y ) / number);
        }
        return value;
    }.bind(this);
};
module.exports = MEMA;