/**
 * Created by Z on 2017-04-25.
 */
/**
 * AVERAGE   我特么到现在还不知道这个干啥的。。。
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    const key = this.getKey('AVERAGE(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            const begin = index - number + 1;
            const array = this.kLine.slice(begin < 0 ? 0 : begin, index + 1);
            const values = array.map((x, itemIndex) => {
                return this.getResult(express, index - number + itemIndex + 1);
            });
            const total = values.reduce((x, y) => x + y);
            const tempTotal = values.reduce((x, y) => {
                return x + Math.abs((y - (total / number)))
            }, 0);
            value = this.checkValue(key, index, tempTotal / number);
        }
        return value;
    }.bind(this);
};