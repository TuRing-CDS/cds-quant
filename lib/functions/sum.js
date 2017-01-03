/**
 * Created by Z on 2017-01-03.
 */
'use strict'
function SUM(express, number) {
    number = number || 5;
    let key = getKey("SUM(", express, ',', number, ")");
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
            let _temp = index - number + 1;
            let array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            array.forEach(function (item, itemIndex) {
                let sub = 0;
                // if("function" == typeof(express)){
                if (isFunction(express)) {
                    // sub = express( index - itemIndex + 1 );
                    sub = express(index - itemIndex);
                } else if (isString(express)) {
                    sub = getValue(express, item);
                } else {
                    sub = express;
                }
                value += sub;
            });
            self.datas[index][key] = value;
        }
        return value;
    }
};

module.exports = SUM;