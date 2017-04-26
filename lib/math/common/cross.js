/**
 * Created by Z on 2017-04-26.
 */
/**
 * CROSS 两条线交叉
 *  CROSS(A,B) 表示当A从下方向上穿过B时返回1，否则返回0
 *  例如:
 *      CROSS(MA(CLOSE,5),MA(CLOSE,10)) 表示5日均线与10日均线交金叉
 * @param express
 * @param express2
 */
module.exports = function (express, express2) {
    const key = this.getKey('CROSS(', express, ',', express2, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            let ep1 = this.getResult(express, index - 1);
            let en1 = this.getResult(express, index);
            let ep2 = this.getResult(express2, index - 1);
            let en2 = this.getResult(express2, index);
            if (ep1 < ep2 && en1 > en2) {
                value = 1;
            } else {
                value = 0;
            }
            value = this.checkValue(key, index, value);
        }
        return value;
    }.bind(this);
};