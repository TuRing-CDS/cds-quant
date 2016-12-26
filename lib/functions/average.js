/**
 * Created by Z on 2016-12-21.
 */
'use strict'
function AVERAGE(express, number) {
    let key = getKey("AVERAGE(", express, ',', number, ")");
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
            if (0 == number) {
                number = self.kline.length;
            }
            let _temp = index - number + 1;
            let array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            let value = 0;
            let temp = [];
            let total = 0;
            let tempTotal = 0;
            array.forEach(function (item, itemIndex) {
                let sub = 0;
                if (isFunction(express)) {
                    sub = express(index - itemIndex);
                } else if (isString(express)) {
                    sub = getValue(express, item);
                } else {
                    sub = express;
                }
                total += sub;
                temp.push(sub);
            });
            temp.forEach(function (item) {
                tempTotal += Math.abs((item - (total / number)));
            });
            value = tempTotal / number;
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = AVERAGE;