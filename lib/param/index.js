/**
 * Created by Z on 2017-04-27.
 */
module.exports = function (context) {
    /**
     * 参数
     * @type {param}
     */
    context.PARAM = context.param = function (name, opts) {
        context.params[name] = opts;
        return function () {
            return context.inputParams[name] || context.params[name].default;
        }
    }
};