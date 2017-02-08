/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function AND(express, express2) {
    let key = getKey("AND(", express, ',', express2, ")");
    if (this.isMath) {
        key = getKey('(', express, ' && ', express2, ')');
    }
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let v1 = calculation.bind(this)(express, index);
            let v2 = calculation.bind(this)(express2, index);
            value = checkValue.bind(this)(key, index, !!(v1 && v2) == true ? 1 : 0);
        }
        return value;
    }.bind(this);
}

module.exports = AND;