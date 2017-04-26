/**
 * Created by Z on 2017-04-25.
 */
/**
 * 成交额
 * @returns {function(this:module)}
 */
module.exports = function () {
    const key = this.getKey('TURNOVER');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let current = this.kLine[index] || this.current;
            value = this.checkValue(key, index, current.turnover);
        }
        return value;
    }.bind(this);
};