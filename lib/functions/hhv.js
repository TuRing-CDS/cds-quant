/**
 * Created by Z on 2016-12-13.
 */
var HHV = function (express, number) {
    number = number || 5;
    var key = getKey("HHV(", express, ',', number, ")");
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
            var value;
            array.forEach(function (item, itemIndex) {
                var sub = 0;
                // if("function" == typeof(express)){
                if (isFunction(express)) {
                    // sub = express( index - itemIndex + 1 );
                    sub = express(index - itemIndex);
                } else if (isString(express)) {
                    sub = getValue(express, item);
                } else {
                    sub = express;
                }
                if (value != 0 && !value) {
                    value = sub;
                }
                if (sub > value) {
                    value = sub;
                }
            });
            if (isNaN(value) || value == Infinity || value == -Infinity) {
                value = temp;
            }
            // value = parseFloat(value.toFixed(self.fixed || 3));
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = HHV;