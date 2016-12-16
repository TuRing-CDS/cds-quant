/**
 * Created by Z on 2016-12-13.
 */
var EMA = function (express, number) {
    number = number || 5;
    var key = getKey("EMA(", express, ',', number, ")");
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
            var current = self.kline[index];
            var temp = 0;
            if (isFunction(express)) {
                temp = express(index);
            } else if (isString(express)) {
                temp = self.getValue(express, current);
            } else {
                temp = express;
            }
            var _y = (index <= 0 ? 0 : self.datas[index - 1][key]) || temp;
            value = ( 2 * temp + ( number - 1 ) * _y ) / ( number + 1 );
            if (isNaN(value) || value == Infinity || value == -Infinity) {
                value = temp;
            }
            value = parseFloat(value.toFixed(4));
            self.datas[index][key] = value;
        }
        return value;
    }
}
module.exports = EMA;