/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function EQ(express, express2) {
    let key = getKey("EQ(", express, ',', express2, ")");
    if (this.isMath) {
        key = getKey('(', express, ' == ', express2, ')');
    }
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if ("@@key" == index) {
            return key;
        }
        if (null === value) {
            let current = this.kline[index] || self.current;
            let v1 = calculation.bind(this)(express, index);
            let v2 = calculation.bind(this)(express2, index);
            value = checkValue.bind(this)(key, index, (v1 === v2) ? 1 : 0);
        }
        return value;
    }.bind(this);
}

module.exports = EQ;