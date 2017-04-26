/**
 * Created by Z on 2017-04-25.
 */
/**
 * 最高价
 * @returns {function(this:module)}
 */
module.exports = function () {
    const key = this.getKey('HIGH');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let current = this.kLine[index] || this.current;
            value = this.checkValue(key, index, current.high);
        }
        return value;
    }.bind(this);
};