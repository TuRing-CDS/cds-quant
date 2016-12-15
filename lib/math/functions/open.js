/**
 * Created by Z on 2016-12-14.
 */
var OPEN = function () {
    var key = getKey('OPEN');
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
        value = current.open;
        return value;
    }
}

module.exports = OPEN;