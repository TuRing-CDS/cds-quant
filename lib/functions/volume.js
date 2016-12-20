/**
 * Created by Z on 2016-12-14.
 */
var VOLUME = function () {
    var key = getKey('VOLUME');
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
        value = current.volume;
        return value;
    }
}

module.exports = VOLUME;