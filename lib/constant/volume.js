/**
 * Created by Z on 2017-04-25.
 */
/**
 * 成交量
 * @returns {function(this:module)}
 */
module.exports = function () {
    const key = this.getKey('VOLUME');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let current = this.kLine[index] || this.current;
            value = current.volume;
        }
        return value;
    }.bind(this);
};