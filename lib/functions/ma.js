/**
 * Created by Z on 2016-12-13.
 */
var MA = function (express, number) {
    number = number || 5;
    var key = getKey("MA(", express, ',', number, ")");
    var self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var value = 0;
        if (undefined == index) {
            index = self.index;
        }
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            var _temp = index - number + 1;
            var array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            var temp = 0;
            array.forEach(function (item, itemIndex) {
                var sub = 0;
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
            value = parseFloat(value.toFixed(self.fixed || 3));
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = exports = MA;