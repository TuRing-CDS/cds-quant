'use strict'
/**
 * IF
 * @param express
 * @param trueResult
 * @param falseResult
 * @returns {function(this:IF)}
 * @constructor
 */
function IF(express, trueResult, falseResult) {
    let key = getKey("IF(", express, "){", trueResult, "}else{", falseResult, "}");
    let self = this;
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            let tag = calculation.bind(this)(express, index);
            let fn = null;
            if (!!tag) {
                fn = trueResult;
            } else {
                fn = falseResult;
            }
            value = calculation.bind(this)(fn, index);
            this.datas[index][key] = value;
        }
        return value;
    }.bind(this);
}

module.exports = IF;