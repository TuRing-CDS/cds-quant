/**
 * Created by Z on 2017-01-03.
 */
'use strict'
function MAX() {
    // let key = getKey("MEMA(", express, ',', number, ")");
    //[].slice.call(arguments)
    let args = [].slice.call(arguments);
    let key = getKey.apply(null, ['MAX('].concat(args.map((x) => {
        return getKey(x)
    }).join(',')).concat(')'));
    let self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        let value = 0;
        if (undefined == index) {
            index = self.index
        }
        if (index < 0) {
            return value;
        }
        if (undefined != self.datas[index][key]) {
            value = self.datas[index][key];
        } else {
            let current = self.kline[index];
            args.forEach(function (express) {
                let temp = null;
                if (isFunction(express)) {
                    temp = express(index);
                } else if (isString(express)) {
                    temp = getValue(express, current);
                } else if (isNumber(express)) {
                    temp = express;
                }
                if (null == value) {
                    value = temp;
                }
                if (temp > value) {
                    value = temp;
                }
            });
            self.datas[index][key] = value;
        }
        return value;
    }
};
module.exports = MAX;