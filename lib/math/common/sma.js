/**
 * Created by Z on 2017-04-26.
 */
/**
 * 求移动平均
 *  SMA(X,N,M)  => 求X的N日移动平均, M 为权重
 *  算法:
 *      Y = SMA(X,N,M)  =>  Y = [M*X+(N-M)*Y']/N  其中 Y' 表示上一周期的Y值, N 必须大于M
 *  例如:
 *      SMA(CLOSE,30,1)  表示求 30 日移动平均价
 * @param express
 * @param number
 * @param weight
 * @returns {function(this:module)}
 */
module.exports = function (express, number, weight) {
    number = number || 5;
    weight = weight || 1;
    const key = this.getKey('SMA(', express, ',', number, ',', weight, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            const temp = this.getResult(express, index);
            const _y = (index < 1 ? 0 : this.cache[index - 1][key]) || temp;
            value = this.checkValue(key, index, (temp * weight + ( number - weight ) * _y ) / number);
        }
        return value;
    }.bind(this);
};