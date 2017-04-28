/**
 * Created by Z on 2017-04-26.
 */
/**
 * HHV  求最高值
 *  HHV(X,N) => 求N周期内X最高值，N=0则从第一个有效值开始
 * 例如:
 *  HHV(HIGH,30)   =>    表示求30日内最高价
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('HHV(', express, ',', number + ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            if (0 === number) {
                number = this.kLine.length;
            }
            const begin = index - number + 1;
            const array = this.kLine.slice(begin < 0 ? 0 : begin, index + 1);
            value = Math.max.apply(null, array.map((item, itemIndex) => {
                return this.getResult(express, index - itemIndex);
            }));
            value = this.cacheValue(key, index, value);
        }
        return value;
    }.bind(this);
};