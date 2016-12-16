/**
 * Created by Z on 2016-12-13.
 */
var COUNT = function (express, number) {
    number = number || 5;
    var key = getKey("COUNT(", express, number,")");
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
            var _temp = index - number + 1;
            var array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            var value = 0;
            array.forEach(function (item, itemIndex) {
                var sub = 0;
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