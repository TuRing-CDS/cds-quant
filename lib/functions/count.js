/**
 * Created by Z on 2016-12-13.
 */
'use strict'
function COUNT(express, number) {
    number = number || 5;
    let key = getKey("COUNT(", express, ',', number, ")");
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
            array.forEach(function (item, itemIndex) {
                let sub = 0;
                if (isFunction(express)) {
                    sub = express(index - itemIndex);
                } else if (isString(express)) {
                    sub = getValue(express, item);
                } else {
                    sub = express;
                }
                if (sub == true) {
                    value++;
                }
            });
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = COUNT;