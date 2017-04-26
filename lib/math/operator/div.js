/**
 * Created by Z on 2017-04-25.
 */
/**
 * 加法
 *  ADD(X,Y)  =>  X+Y
 * @param express
 * @param express2
 * @returns {function(this:module)}
 */
module.exports = function (express, express2) {
    const key = this.getKey('(', express, '/', express2, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            value = this.getResult(express, index) / this.getResult(express2, index);
            value = this.checkValue(key, index, value);
        }
        return value;
    }.bind(this);
}