/**
 * Created by Z on 2017-04-25.
 */
/**
 * BARSLAST 上一次条件成立到当前的周期数
 *  BARSLAST(X)   =>   上一次X不为0到现在的天数
 * @param express
 * @returns {function(this:module)}
 */
module.exports = function (express) {
    let key = this.getKey('BARSLAST(', express, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let temp = this.getResult(express, index);
            if (temp) {
                value = 0;
            } else {
                value = this.cache[index - 1] ? this.cache[index - 1][key] + 1 : 1;
            }
            value = this.cacheValue(key, index, value);
        }
        return value;
    }.bind(this);
};