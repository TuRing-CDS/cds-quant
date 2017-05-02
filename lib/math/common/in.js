/**
 * Created by Z on 2017-05-02.
 */
/**
 * IN   求值是否包含在里面
 *  IN('00001',CONCEPTS)  =>  是否在概念内
 * @param express
 * @param array
 * @returns {function(this:module)}
 */
module.exports = function (express, array) {
    if (array instanceof Function) {
        array = array();
    }
    const key = this.getKey('(', express, 'in[', array, '])');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            const temp = this.getResult(express, index);
            value = array.indexOf(temp) == -1 ? 0 : 1;
            value = this.cacheValue(key, index, value);
        }
        return value;
    }.bind(this);
};