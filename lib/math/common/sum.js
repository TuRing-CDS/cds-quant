/**
 * Created by Z on 2017-04-26.
 */
/**
 * 求总和
 *  用法:
 *      SUM(X,N)    =>  统计N周期中 X 的总和
 *  例如:
 *      SUM(VOL,0)  =>  表示统计从上市第一天以来的成交量总和
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('SUM(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(express, index);
        if (null === value) {
            const begin = index - number + 1;
            const array = this.kLine.slice(begin < 0 ? 0 : begin, index + 1);
            value = array.map((x, itemIndex) => {
                return this.getResult(express, index - itemIndex);
            }).reduce((x, y) => x + y);
            value = this.checkValue(key, index, value);
        }
        return value;
    }.bind(this);
};