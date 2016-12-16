/**
 * Created by Z on 2016-12-13.
 */
var REF = function (express, number) {
    number = number || 5;
    var key = getKey("REF(", express, ',', number, ")");
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
        var refObj = self.kline[index - number];
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
            self.datas[index][key] = parseFloat(value.toFixed(4));
        }
        return value;
    }
};

module.exports = REF;