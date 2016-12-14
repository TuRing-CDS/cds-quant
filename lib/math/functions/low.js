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
        var cb,
            value = 0;
        if (isFunction(index)) {
            cb = index;
            index = self.index;
        }
        if (index < 0) {
            if (cb) {
                cb(null, value);
            }
            return value;
        }
        var current = self.kline[index] || self.current;
        value = current.low;
        if (cb) {
            cb(null, value);
        }
        return value;
    }
}

module.exports = LOW;