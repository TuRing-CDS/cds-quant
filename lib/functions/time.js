/**
 * Created by Z on 2016-12-14.
 */
var TIME = function () {
    var key = getKey('TIME');
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
            if (cb) {
                cb(null, value);
            }
            return value;
        }
        var current = self.kline[index] || self.current;
        value = current.time;
        return value;
    }
}

module.exports = TIME;