/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function EMA(express, number) {
    number = number || 5;
    let key = getKey("EMA(", express, ',', number, ")");
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
                temp = self.getValue(express, current);
            } else {
                temp = express;
            }
            let _y = (index <= 0 ? 0 : self.datas[index - 1][key]) || temp;
            value = ( 2 * temp + ( number - 1 ) * _y ) / ( number + 1 );
            if (isNaN(value) || value == Infinity || value == -Infinity) {
                value = temp;
            }
            self.datas[index][key] = value;
        }
        return value;
    }
}
module.exports = EMA;