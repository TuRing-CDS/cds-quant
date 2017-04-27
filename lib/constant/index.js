/**
 * Created by Z on 2017-04-27.
 */
module.exports = function(context){
    /***************************常量Begin***************************/

    /**
     * 开盘价
     */
    context.OPEN = context.O = context.open = function () {
        return require('./open').apply(context, arguments);
    }();
    /**
     * 最低价
     */
    context.LOW = context.L = context.low = function () {
        return require('./low').apply(context, arguments);
    }();
    /**
     * 最高价
     */
    context.HIGH = context.H = context.high = function () {
        return require('./high').apply(context, arguments);
    }();
    /**
     * 收盘价
     */
    context.CLOSE = context.C = context.close = function () {
        return require('./close').apply(context, arguments);
    }();
    /**
     * 成交量
     */
    context.VOLUME = context.V = context.volume = function () {
        return require('./volume').apply(context, arguments);
    }();
    /**
     * 成交额
     */
    context.TURNOVER = context.T = context.turnover = function () {
        return require('./turnover').apply(context, arguments);
    }();

    /***************************常量End88***************************/
}