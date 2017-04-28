/**
 * Created by Z on 2017-04-26.
 */
/**
 * 线性回归斜率
 *  SLOPE(X,N)  =>  X的N周期线性回归线的斜率
 *  例如:
 *      SLOPE(CLOSE,10)  =>   表示 求 10 周期线性回归线的斜率
 * @param express
 * @param number
 * @returns {function(this:module)}
 */
module.exports = function (express, number) {
    number = number || 5;
    const key = this.getKey('SLOPE(', express, ',', number, ')');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            const begin = index - number + 1;
            const array = this.kLine.slice(begin < 0 ? 0 : begin, index + 1);
            const values = array.map((x, itemIndex) => this.getResult(express, index - itemIndex));
            const yTotal = values.reduce((x, y) => x + y);
            // 等差算法
            // var x = 5;var total = 0; while(x!=0){ total+=x--;}
            // http://baike.baidu.com/link?url=nAYUpPBTV4dXxsbYQDJ4P7fOwSCt95-qyPf4b393RwdH-1-4-lSCSZbrkLsTgN3kxQplOx1lyePb4CcjjKt7dn4d7TJQSLv0MGkByNV4MiCH1_dYmKkJlFyAY-CnI0vxxEQ3LnlJWX2zb3WcnqOqbe86UiIx8isdRpQq33JA11sTJHjZEhg9FXuLojZTJQNn
            const xTotal = (1 + number) * number / 2;
            const yAvg = yTotal / number;
            const xAvg = xTotal / number;
            let fmSum = 0;
            let fzSum = 0;
            values.forEach((item, tempIndex) => {
                const x = tempIndex + 1;
                let y = item;
                fzSum += (x - xAvg) * (y - yAvg);
                fmSum += Math.pow((x - xAvg), 2);
            });
            let b = fzSum / fmSum;
            // let a = yavg - (b * xavg);
            value = this.cacheValue(key, index, b);
        }
        return value;
    }.bind(this);
};