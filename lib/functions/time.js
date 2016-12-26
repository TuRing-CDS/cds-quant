/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function TIME() {
    let key = getKey('TIME');
    let self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        let value = 0;
        if (undefined == index) {
            index = self.index
        }
        if (index < 0) {
            if (cb) {
                cb(null, value);
            }
            return value;
        }
        let current = self.kline[index] || self.current;
        value = current.time;
        return value;
    }
}

module.exports = TIME;