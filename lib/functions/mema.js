/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function MEMA(express, number) {
    number = number || 5;
    let key = getKey("MEMA(", express, ',', number, ")");
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
            value = (temp + ( number - 1 ) * _y ) / number;
            if (isNaN(value) || value == Infinity || value == -Infinity) {
                value = temp;
            }
            // value = parseFloat(value.toFixed(self.fixed || 3));
            self.datas[index][key] = value;
        }
        return value;
    }
};
module.exports = MEMA;