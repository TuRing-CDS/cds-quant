/**
 * Created by Z on 2017-04-26.
 */
/**
 * MEMA 求改良指数平滑移动平均
 *  MEMA(X,N)       =>  若 Y = MEMA(X,N)   =>   Y = [X+(N-1)*Y']/N;
 * 例如:
 *  MEMA(CLOSE,30)  =>  表示求  30 日改良指数平滑均价
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('MEMA(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(express, index);
        if (null === value) {
            const temp = this.getResult(express, index);
            const _y = (index < 1 ? 0 : this.cache[index - 1][key]) || temp;
            value = this.cacheValue(express, index, (temp + (number - 1) * _y) / number);
        }
        return value;
    }.bind(this);
};