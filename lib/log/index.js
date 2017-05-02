/**
 * Created by Z on 2017-04-25.
 */
module.exports = function (context) {
    let namespace = function (_namespace) {
        return function () {
            return console.log.apply(null, [new Date().toLocaleString(), '=>', _namespace, '{'].concat(Array.prototype.slice.call(arguments)).map((x) => {
                if ('[object Function]' === Object.prototype.toString.call(x)) {
                    return x();
                }
                return x;
            }).concat('}'));
        }
    };

    context.log = {
        info: function () {
            return namespace('[I]').apply(context, arguments);
        },
        debug: function () {
            return namespace('[D]').apply(context, arguments);
        },
        warn: function () {
            return namespace('[W]').apply(context, arguments);
        },
        error: function () {
            return namespace('[E]').apply(context, arguments);
        }
    }
};