/**
 * Created by Z on 2017-04-26.
 */
/**
 * REF  引用若干周期前的数据
 *  REF(X,A)  引用A周期前的X值
 *  例如:
 *      REF(CLOSE,1)   =>  表示上一周期的收盘价,在日K上就是昨收
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('REF(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            if (index < number - 1) {
                return 0;
            }
            value = this.checkValue(key, index, this.getResult(express, index - 1));
        }
        return value;
    }.bind(this);
};