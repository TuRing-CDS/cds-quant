/**
 * Created by Z on 2016-12-14.
 */
var LOW = function () {
    var key = getKey('LOW');
    var self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var value = 0;
        if (index < 0) {
            return value;
        }
        var current = self.kline[index] || self.current;
        value = current.low;
        return value;
    }
}

module.exports = LOW;