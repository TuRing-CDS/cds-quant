/**
 * Created by Z on 2016-12-13.
 */
'use strict';
function ABS(express) {
    let key = getKey("ABS(", express, ")");
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let current = this.kline[index] || this.current;
            if (isFunction(express)) {
                value = express(index);
            } else if (isString(express)) {
                value = getValue(express, current);
            } else if (isNumber(express)) {
                value = express;
            }
            value = checkValue.bind(this)(key, index, Math.abs(value));
        }
        return value;
    }.bind(this);
}

module.exports = ABS;