/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function MA(express, number) {
    number = number || 5;
    let key = getKey("MA(", express, ',', number, ")");
    let self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        let value = 0;
        if (undefined == index) {
            index = self.index;
        }
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            let _temp = index - number + 1;
            let array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            let temp = 0;
            array.forEach(function (item, itemIndex) {
                let sub = 0;
                if (isFunction(express)) {
                    sub = express(index - number + itemIndex + 1);
                    // sub = express(index - number);
                } else {
                    sub = getValue(express, item);
                }
                if (sub) {
                    temp += sub;
                }
            });
            value = temp / number;
            if (isNaN(value) || value == Infinity || value == -Infinity) {
                value = temp;
            }
            // self.datas[key][index] = parseFloat(value.toFixed(2));
            // value = parseFloat(value.toFixed(self.fixed || 3));
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = MA;