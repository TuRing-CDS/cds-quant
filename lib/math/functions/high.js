/**
 * Created by Z on 2016-12-14.
 */
var HIGH = function () {
    var key = getKey('HIGH');
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
        var current = self.kline[index] || self.current;
        value = current.high;
        return value;
    }
}

module.exports = HIGH;