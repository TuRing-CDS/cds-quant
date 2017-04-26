/**
 * Created by Z on 2017-04-25.
 */
module.exports = function (context) {

    /***************************常量Begin***************************/

    /**
     * 开盘价
     */
    context.OPEN = context.O = context.open = function () {
        return require('./const/open').apply(context, arguments);
    }();
    /**
     * 最低价
     */
    context.LOW = context.L = context.low = function () {
        return require('./const/low').apply(context, arguments);
    }();
    /**
     * 最高价
     */
    context.HIGH = context.H = context.high = function () {
        return require('./const/high').apply(context, arguments);
    }();
    /**
     * 收盘价
     */
    context.CLOSE = context.C = context.close = function () {
        return require('./const/close').apply(context, arguments);
    }();
    /**
     * 成交量
     */
    context.VOLUME = context.V = context.volume = function () {
        return require('./const/volume').apply(context, arguments);
    }();
    /**
     * 成交额
     */
    context.TURNOVER = context.T = context.turnover = function () {
        return require('./const/turnover').apply(context, arguments);
    }();

    /***************************常量End88***************************/


    /***************************运算Begin***************************/

    /**
     * 加法
     * @type {add}
     */
    context.ADD = context.add = function () {
        return require('./operator/add').apply(context, arguments);
    };

    /**
     * 减法
     * @type {sub}
     */
    context.SUB = context.sub = function () {
        return require('./operator/sub').apply(context, arguments);
    };

    /**
     * 除法
     * @type {div}
     */
    context.DIV = context.div = function () {
        return require('./operator/div').apply(context, arguments);
    };

    /**
     * 乘法
     * @type {mul}
     */
    context.MUL = context.mul = function () {
        return require('./operator/mul').apply(context, arguments);
    };

    /**
     * 大于
     * @type {gt}
     */
    context.GT = context.gt = function () {
        return require('./operator/gt').apply(context, arguments);
    };

    /**
     * 小于
     * @type {gt}
     */
    context.LT = context.lt = function () {
        return require('./operator/lt').apply(context, arguments);
    };

    /**
     * 或者
     * @type {or}
     */
    context.OR = context.or = function(){
        return require('./operator/or').apply(context,arguments);
    };

    /**
     * 同时
     * @type {and}
     */
    context.AND = context.and = function(){
        return require('./operator/and').apply(context,arguments);
    };

    /***************************运算End88***************************/

    /***************************常用Begin***************************/

    /**
     * 移动平均线
     * @type {ma}
     */
    context.MA = context.ma = function () {
        return require('./common/ma').apply(context, arguments);
    };

    /**
     * 平滑移动平均
     * @type {ema}
     */
    context.EMA = context.ema = function () {
        return require('./common/ema').apply(context, arguments);
    };

    /**
     * 绝对值
     * @type {abs}
     */
    context.ABS = context.abs = function () {
        return require('./common/abs').apply(context, arguments);
    };

    /**
     * 上一次条件成立到当前的周期数
     * @type {barslast}
     */
    context.BARSLAST = context.barslast = function () {
        return require('./common/barslast').apply(context, arguments);
    };

    /**
     * 统计满足条件的周期数
     * @type {count}
     */
    context.COUNT = context.count = function () {
        return require('./common/count').apply(context, arguments);
    };

    /**
     * 两条线交叉
     * @type {cross}
     */
    context.CROSS = context.cross = function () {
        return require('./common/cross').apply(context, arguments);
    };

    /**
     * 求最高值
     * @type {hhv}
     */
    context.HHV = context.hhv = function () {
        return require('./common/hhv').apply(context, arguments);
    };

    /**
     * IF判断
     * @type {if}
     */
    context.IF = context.if = function(){
        return require('./common/if').apply(context,arguments);
    };

    /**
     * 求最低值
     * @type {llv}
     */
    context.LLV = context.llv = function(){
        return require('./common/llv').apply(context,arguments);
    };

    /**
     * 求最大值
     * @type {max}
     */
    context.MAX = context.max = function(){
        return require('./common/max').apply(context,arguments);
    };

    /**
     * 改良指数平滑移动平均
     * @type {mema}
     */
    context.MEMA = context.mema = function(){
        return require('./common/mema').apply(context,arguments);
    };

    /**
     * 引用若干周期前的数据
     * @type {ref}
     */
    context.REF = context.ref = function(){
        return require('./common/ref').apply(context,arguments);
    };

    /**
     * 线性回归斜率
     * @type {slope}
     */
    context.SLOPE = context.slope = function(){
        return require('./common/slope').apply(context,arguments);
    };

    /***************************常用End88***************************/
};