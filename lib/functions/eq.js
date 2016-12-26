/**
 * Created by Z on 2016-12-14.
 */
'use strict'
function EQ(express, express2) {
    let key = getKey("EQ(", express, ',', express2, ")");
    if (this.isMath) {
        key = getKey('(', express, ' == ', express2, ')');
    }
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
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            let current = self.kline[index] || self.current;
            let v1 = 0;
            let v2 = 0;
            if (isFunction(express)) {
                v1 = express(index);
            } else if (isString(express)) {
                v1 = getValue(express, current);
            } else if (isNumber(express)) {
                v1 = express;
            }
            if (isFunction(express2)) {
                v2 = express2(index)
            } else if (isString(express2)) {
                v2 = getValue(express2, current);
            } else if (isNumber(express)) {
                v2 = express2;
            }
            value = (v1 == v2) ? 1 : 0;
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = EQ;