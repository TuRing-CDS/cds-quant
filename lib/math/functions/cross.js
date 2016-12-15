/**
 * Created by Z on 2016-12-13.
 */
var CROSS = function (express, express2) {
    var key = getKey("CROSS", express, express2);
    var self = this;
    return function (index) {
        if ("@@key" == index) {
            return key;
        }
        var value = 0;
        if (index < 1) {
            return 0;
        }
        if(undefined != self.datas[index][key]){
            value = self.datas[index][key];
        }else{
            var current = self.kline[index];
            var result;
            var expvl1,expvc1;
            var expvl2,expvc2;
            if (isFunction(express)) {
                expvc1 = express(index);
                expvl1 = express(index - 1);

            } else if (isString(express)) {
                expvc1 = getValue(express, current);
                expvl1 = getValue(express, self.kline[index - 1]);
            }
            if (isFunction(express2)) {
                expvc2 = express2(index);
                expvl2 = express2(index - 1);
            } else if (isString(express2)) {
                expvc2 = getValue(express2, current);
                expvl2 = getValue(express2, self.kline[index - 1]);
            }
            if (expvl1 < expvl2 && expvc1 > expvc2 ) {
                result = 1;//上穿成功
            } else {
                result = 0;//上穿失败
            }
            self.datas[index][key] = value = result;
        }
        return value;
    }
};
module.exports = CROSS;