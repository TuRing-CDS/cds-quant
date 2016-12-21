/**
 * Created by Z on 2016-12-21.
 */
var AVERAGE = function (express, number) {
    var key = getKey("AVERAGE(", express, ',', number, ")");
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
            if (0 == number) {
                number = self.kline.length;
            }
            var _temp = index - number + 1;
            var array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            var value = 0;
            var temp = [];
            var total = 0;
            var tempTotal = 0;
            array.forEach(function (item, itemIndex) {
                var sub = 0;
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
            value = parseFloat((tempTotal / number).toFixed(self.fixed || 3));
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = AVERAGE;