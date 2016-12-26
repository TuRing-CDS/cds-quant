/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function OPEN() {
    let key = getKey('OPEN');
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
            return value;
        }
        let current = self.kline[index] || self.current;
        value = current.open;
        return value;
    }
}

module.exports = OPEN;