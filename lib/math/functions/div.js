/**
 * Created by Z on 2016-12-14.
 */
var DIV = function (express, express2) {
    var key = getKey("DIV", express, express2);
    var self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var value = 0;
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            var current = self.kline[index] || self.current;
            var v1 = 0;
            var v2 = 0;
            if (isFunction(express)) {
                v1 = express(index);
            } else if (isString(express)) {
                v1 = getValue(express, current);
            } else if (isNumber(express)) {
                v1 = express;
            }
            if (isFunction(express2)) {
                v2 = express2(index)
            } else if (isString(express2)) {
                v2 = getValue(express2, current);
            } else if (isNumber(express)) {
                v2 = express2;
            }
            value = parseFloat((v1 / v2).toFixed(4));
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = DIV;