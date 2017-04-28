/**
 * Created by Z on 2017-04-26.
 */
/**
 * COUNT  统计满足条件的周期数
 *  COUNT(X,N)   =>   统计N周期中满足X条件的周期数,若N =0 则从第一个有效值开始
 *  COUNT(CLOSE>OPEN,20)  表示统计20周期内收阳的周期数
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('COUNT(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            if (0 === number) {
                number = this.kLine.length;
            }
            const begin = index - number + 1;
            const array = this.kLine.slice(begin < 0 ? 0 : begin, index + 1);
            value = array.map((item, itemIndex) => {
                const sub = this.getResult(express, index - itemIndex);
                if (!!sub) {
                    return 1;
                }
                return 0;
            }).reduce((x, y) => x + y);
            value = this.cacheValue(key, index, value);
        }
        return value;
    }.bind(this);
};