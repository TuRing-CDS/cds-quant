/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function TIME() {
    let key = getKey('TIME');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            value = checkValue.bind(this)(key, index, current.time);
        }
        return value;
    }.bind(this);
}

module.exports = TIME;