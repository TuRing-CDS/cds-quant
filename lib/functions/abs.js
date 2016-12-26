/**
 * Created by Z on 2016-12-13.
 */
'use strict';
function ABS(express) {
    let key = getKey("ABS(", express, ")");
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
            let current = self.kline[index] || self.current;
            if (isFunction(express)) {
                value = express(index);
            } else if (isString(express)) {
                value = getValue(express, current);
            } else if (isNumber(express)) {
                value = express;
            }
            value = Math.abs(value);
            if (isNaN(value) || Infinity == value || -Infinity == value) {
                value = 0;
            }
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = ABS;