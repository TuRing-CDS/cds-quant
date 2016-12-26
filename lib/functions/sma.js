/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function SMA(express, number, weight) {
    number = number || 5;
    weight = weight || 1;
    let key = getKey("SMA(", express, ',', number, ',', weight, ")");
    let self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        let value = 0;
        if (undefined == index) {
            index = self.index
        }
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            let current = self.kline[index];
            let temp = 0;
            if (isFunction(express)) {
                temp = express(index);
            } else if (isString(express)) {
                temp = getValue(express, current);
            }
            let _y = ( index < 1 ? 0 : self.datas[index - 1][key] ) || temp;
            value = (temp * weight + ( number - weight ) * _y ) / number;
            if (isNaN(value) || value == Infinity || value == -Infinity) {
                value = temp;
            }
            self.datas[index][key] = value;
        }
        return value;
    }
};
module.exports = SMA;