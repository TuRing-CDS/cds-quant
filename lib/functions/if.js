/**
 * Created by Z on 2017-01-03.
 */
'use strict'
function IF(express, trueResult, falseResult) {
    let key = getKey("IF(", express, "){", trueResult, "}else{", falseResult, "}");
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
            let tag = 0;
            if (isFunction(express)) {
                tag = express(index);
            } else if (isString(express)) {
                tag = getValue(express, current);
            } else if (isNumber(express)) {
                tag = express;
            }
            let fn = null;
            if (!!tag) {
                fn = trueResult;
            } else {
                fn = falseResult;
            }
            if (isFunction(fn)) {
                value = fn(index);
            } else if (isString(fn)) {
                value = getValue(fn, current);
            } else if (isNumber(fn)) {
                value = fn;
            }
            self.datas[index][key] = value;
        }
        return value;
    }
}

module.exports = IF;