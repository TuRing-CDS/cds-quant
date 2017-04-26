/**
 * Created by Z on 2017-04-25.
 */
'use strict';
/**
 * 平滑移动平均
 *  Y = EMA(X,N)  =>  Y = [2*X+(N-1)*Y']/(N+1)
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('EMA(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let temp = this.getResult(express, index);
            let _y = (index <= 0 ? 0 : this.cache[index - 1][key]) || temp;
            value = this.checkValue(key, index, ( 2 * temp + ( number - 1 ) * _y ) / ( number + 1 ));
        }
        return value;
    }.bind(this);
};