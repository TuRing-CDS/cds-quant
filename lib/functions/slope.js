'use strict'
/**
 * SLOPE
 * @param express
 * @param number
 * @returns {Function}
 * @constructor
 */
function SLOPE(express, number) {
    number = number || 5;
    let key = getKey("SLOPE(", express,',', number,")");
    let self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        let value = 0;
        if (undefined == index) {
            index = self.index
        }
        let _temp = index - number + 1;
        if (_temp < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            let array = self.kline.slice(_temp < 0 ? 0 : _temp, index + 1);
            let ytotal = 0;
            let xtotal = 0;
            let _index = 0;
            let xavg = 0;
            let yavg = 0;
            let fmsum = 0;
            let fzsum = 0;
            let tempArray = [];
            array.forEach(function (item, itemIndex) {
                let temp;
                if ("function" == typeof(express)) {
                    temp = express(index - number);
                    // temp = express(index - number + itemIndex + 1);
                } else if ("string" == typeof (express)) {
                    temp = getValue(express, item);
                }
                ytotal += temp;
                tempArray.push(temp);
                _index++;
                xtotal += _index;
            });
            yavg = ytotal / number;
            xavg = xtotal / number;
            tempArray.forEach(function (item, tempIndex) {
                let x = tempIndex + 1;
                let y = item;
                console.log("before",x , xavg , y , yavg)
                fzsum += (x - xavg) * (y - yavg);
                fmsum += Math.pow((x - xavg), 2);
                console.log('===========')
            });
            let b = fzsum / fmsum;
            let a = yavg - (b * xavg);
            // self.datas[key][index] = b;
            self.datas[index][key] = value = b;
        }
        return value;
    }
};

module.exports = SLOPE;