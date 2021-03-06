/**
 * Created by Z on 2017-04-25.
 */
module.exports = function (context) {

    /***************************运算Begin***************************/

    /**
     * 加法
     * @type {add}
     */
    context.ADD = context.add = function () {
        return require('./operator/add').apply(context, arguments);
    };

    Function.prototype.ADD = Function.prototype.add = function (other) {
        return context.ADD(this, other);
    };

    /**
     * 减法
     * @type {sub}
     */
    context.SUB = context.sub = function () {
        return require('./operator/sub').apply(context, arguments);
    };

    Function.prototype.SUB = Function.prototype.sub = function (other) {
        return context.SUB(this, other)
    };

    /**
     * 除法
     * @type {div}
     */
    context.DIV = context.div = function () {
        return require('./operator/div').apply(context, arguments);
    };

    Function.prototype.DIV = Function.prototype.div = function (other) {
        return context.DIV(this, other);
    };

    /**
     * 乘法
     * @type {mul}
     */
    context.MUL = context.mul = function () {
        return require('./operator/mul').apply(context, arguments);
    };

    Function.prototype.MUL = Function.prototype.mul = function (other) {
        return context.MUL(this, other);
    };

    /**
     * 等于
     * @type {eq}
     */
    context.EQ = context.eq = function () {
        return require('./operator/eq').apply(context, arguments);
    };

    Function.prototype.EQ = Function.prototype.eq = function (other) {
        return context.EQ(this, other);
    };

    /**
     * 大于
     * @type {gt}
     */
    context.GT = context.gt = function () {
        return require('./operator/gt').apply(context, arguments);
    };

    Function.prototype.GT = Function.prototype.gt = function (other) {
        return context.GT(this, other);
    };

    /**
     * 小于
     * @type {gt}
     */
    context.LT = context.lt = function () {
        return require('./operator/lt').apply(context, arguments);
    };

    Function.prototype.LT = Function.prototype.lt = function (other) {
        return context.LT(this, other);
    };

    /**
     * 或者
     * @type {or}
     */
    context.OR = context.or = function () {
        return require('./operator/or').apply(context, arguments);
    };

    Function.prototype.OR = Function.prototype.or = function (other) {
        return context.OR(this, other);
    };

    /**
     * 同时
     * @type {and}
     */
    context.AND = context.and = function () {
        return require('./operator/and').apply(context, arguments);
    };

    Function.prototype.AND = Function.prototype.and = function (other) {
        return context.AND(this, other);
    };


    /**
     * 在里面
     * @type {IN}
     */
    context.IN = context.IN = function () {
        return require('./common/in').apply(context, arguments);
    };

    Function.prototype.IN = Function.prototype.in = function (array) {
        return context.IN(this, array);
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
    context.IF = context.if = function () {
        return require('./common/if').apply(context, arguments);
    };

    /**
     * 求最低值
     * @type {llv}
     */
    context.LLV = context.llv = function () {
        return require('./common/llv').apply(context, arguments);
    };

    /**
     * 求最大值
     * @type {max}
     */
    context.MAX = context.max = function () {
        return require('./common/max').apply(context, arguments);
    };

    /**
     * 改良指数平滑移动平均
     * @type {mema}
     */
    context.MEMA = context.mema = function () {
        return require('./common/mema').apply(context, arguments);
    };

    /**
     * 引用若干周期前的数据
     * @type {ref}
     */
    context.REF = context.ref = function () {
        return require('./common/ref').apply(context, arguments);
    };

    /**
     * 线性回归斜率
     * @type {slope}
     */
    context.SLOPE = context.slope = function () {
        return require('./common/slope').apply(context, arguments);
    };

    /**
     * 移动平均
     * @type {sma}
     */
    context.SMA = context.sma = function () {
        return require('./common/sma').apply(context, arguments);
    };

    /**
     * 求总和
     * @type {sum}
     */
    context.SUM = context.sum = function () {
        return require('./common/sum').apply(context, arguments);
    };

    /***************************常用End88***************************/
};