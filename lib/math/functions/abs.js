/**
 * Created by Z on 2016-12-13.
 */
var ABS = function (express) {
    var key = getKey("ABS", express);
    var self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var value = 0;
        if (index == undefined) {
            index = self.index
        }
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            var current = self.kline[index] || self.current;
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