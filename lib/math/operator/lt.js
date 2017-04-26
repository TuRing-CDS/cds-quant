/**
 * Created by Z on 2017-04-25.
 */
/**
 * LT 小于
 *  LT(C,O)   =>   CLOSE < OPEN
 * @param express
 * @param express2
 * @returns {function(this:module)}
 */
module.exports = function (express, express2) {
    const key = this.getKey('(', express, '<', express2, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            value = this.getResult(express, index) < this.getResult(express2, index) ? 1 : 0;
        }
        return value;
    }.bind(this);
}