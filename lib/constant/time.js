/**
 * Created by Z on 2017-04-28.
 */
/**
 * 当前时间
 * @returns {function(this:module)}
 */
module.exports = function () {
    const key = this.getKey('OPEN');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let current = this.kLine[index] || this.current;
            value = current.close;
        }
        return value;
    }.bind(this);
};