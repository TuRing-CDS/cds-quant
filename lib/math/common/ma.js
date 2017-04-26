/**
 * Created by Z on 2017-04-25.
 */
'use strict';
/**
 * 移动平均值
 *  MA(X,N)  =>  (X1+X2+X3+...Xn)/N
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('MA(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let begin = index - number + 1;
            let array = this.kLine.slice(begin < 0 ? 0 : begin, index + 1);
            value = array.map((item, itemIndex) => {
                return this.getResult(express,index - number + itemIndex + 1);
            }).reduce((x, y) => x + y);
            value = this.checkValue(key, index, value / number);
        }
        return value;
    }.bind(this);
};