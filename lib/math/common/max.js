/**
 * Created by Z on 2017-04-26.
 */
/**
 * MAX 求最大值
 *  MAX(A,B,C....N)  返回所有参数中的最大值
 * 例如:
 *  MAX(CLOSE,OPEN,REF(CLOSE,1))  表示返回昨收,今开,收盘三个价格中最高的价格
 * @returns {function(this:module)}
 */
module.exports = function () {
    const args = [].slice.call(arguments);
    const key = this.getKey.apply(this, ['MAX('].concat(args.map((x) => {
        return this.getKey(x)
    }).join(',')).concat(')'));
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            value = Math.max.apply(null, args.map((x) => {
                return this.getResult(x, index);
            }));
            value = this.cacheValue(key, index, value);
        }
        return value;
    }.bind(this);
};