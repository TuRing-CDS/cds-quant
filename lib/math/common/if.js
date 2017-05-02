/**
 * Created by Z on 2017-04-26.
 */
/**
 * 分支语句
 *  分支语句 IF expr THEN expr ELSE expr
 * @param express
 * @param trueResult
 * @param falseResult
 * @returns {function(this:module)}
 */
module.exports = function (express, trueResult, falseResult) {
    const key = this.getKey('IF(', express, '){', trueResult, '}else{', falseResult, '}');
    return function (index) {
        index = index || this.index;
        let value = this.getCache(key, index);
        if (null === value) {
            const tag = this.getResult(express, index);
            let fn = null;
            if (!!tag) {
                fn = trueResult;
            } else {
                fn = falseResult;
            }
            value = this.getResult(fn, index);
            value = this.cacheValue(key,index,value);
        }
        return value;
    }.bind(this);
};