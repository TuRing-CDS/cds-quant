/**
 * Created by Z on 2016-12-13.
 */
'use strict'
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
                if ("function" == typeof(express)) {
                    value = express(index - number);
                    // value = express(index - number + itemIndex + 1);
                } else if ("string" == typeof (express)) {
                    value = getValue(express, item);
                }
                ytotal += value;
                tempArray.push(value);
                _index++;
                xtotal += _index;
            });
            yavg = ytotal / number;
            xavg = xtotal / number;
            tempArray.forEach(function (item, tempIndex) {
                let x = tempIndex + 1;
                let y = item;
                fzsum += (x - xavg) * (y - yavg);
                fmsum += Math.pow((x - xavg), 2);
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