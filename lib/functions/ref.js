/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function REF(express, number) {
    number = number || 5;
    let key = getKey("REF(", express, ',', number, ")");
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
        let refObj = self.kline[index - number];
        if (!refObj) {
            return 0;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            if (index < number - 1) {
                return 0;
            }
            if (isFunction(express)) {
                value = express(index - number);
            } else if (isString(express)) {
                value = getValue(express, refObj);
            }
            self.datas[index][key] = value;
        }
        return value;
    }
};

module.exports = REF;