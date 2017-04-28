/**
 * Created by Z on 2017-04-25.
 */
'use strict';
/**
 * 绝对值
 *  ABS(-1)   =>   1
 * @param express
 * @returns {function(this:module)}
 */
module.exports = function (express) {
    const key = this.getKey('ABS(', express, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            value = this.cacheValue(key, index, Math.abs(this.getResult(express, index)));
        }
        return value;
    }.bind(this);
};