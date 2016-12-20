/**
 * Created by Z on 2016-12-14.
 */
var BARSLAST = function (express) {
    var key = getKey("BARSLAST(", express,")");
    var self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var value = 0;
        if (undefined == index) {
            index = self.index
        }
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            var current = self.kline[index] || self.current;
            var temp = false;
            if (isFunction(express)) {
                temp = express(index);
            } else if (isString(express)) {
                temp = getValue(express, current);
            } else if (isNumber(express)) {
                temp = express;
            }
            if (temp) {
                value = 0;
            } else {
                value = self.datas[index - 1] ? self.datas[index - 1][key] + 1 : 1;
            }
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = BARSLAST;