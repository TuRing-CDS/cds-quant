/**
 * Created by Z on 2017-04-25.
 */
module.exports = function (context) {
    /**
     * 类型
     * @param name
     * @returns {Function}
     */
    function isType(name) {
        return function (obj) {
            return name === typeof( obj );
        }
    };
    /**
     * Value Of 方法在运算的时候，值
     * @returns {*}
     */
    Function.prototype.valueOf = function () {
        let value = this();
        if (typeof(value) === 'number') {
            return Number(value.toFixed(context.fixed || 3));
        }
        return value;
    }

    /**
     * 是否是Function
     * @type {Function}
     */
    const isFunction = isType('function');

    /**
     * 是否是Number
     * @type {Function}
     */
    const isNumber = isType('number');

    /**
     * 是否是String
     * @type {Function}
     */
    const isString = isType('string');

    /**
     * 是否是 Array
     * @param array
     * @returns {boolean}
     */
    const isArray = function (array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    };

    /**
     * 得到Key
     * @returns {string}
     */
    context.getKey = function () {
        let subs = [];
        for (let key in arguments) {
            if (undefined === arguments[key]) {
                continue;
            } else if (isFunction(arguments[key])) {
                subs.push(arguments[key]('@@key'));
            } else {
                subs.push(arguments[key]);
            }
        }
        return subs.join('');
    };

    /**
     * 得到结果
     * @param express
     * @param index
     * @returns {number}
     */
    context.getResult = function (express, index) {
        let value = 0;
        if (isFunction(express)) {
            value = express(index);
        } else if (isNumber(express)) {
            value = express;
        } else if (isString(express)) {
            value = express;
        }
        return value;
    };

    /**
     * 获取缓存
     * @param key
     * @param index
     * @returns {*}
     */
    context.getCache = function (key, index) {
        if ('@@key' === index) {
            return key;
        }
        if (index < 0) {
            return 0;
        }
        if (undefined !== context.cache[index][key]) {
            return context.cache[index][key];
        }
        return null;
    };

    /**
     * 缓存Value
     * @param key
     * @param index
     * @param value
     * @returns {*}
     */
    context.cacheValue = function (key, index, value) {
        value = context.checkValue(value);
        context.cache[index][key] = value;
        return value;
    };
    /**
     * 检查Values
     * @param value
     * @returns {*}
     */
    context.checkValue = function (value) {
        if (isArray(value)) {
            return value;
        }
        if (isNaN(value) || Infinity === value || -Infinity === value) {
            value = 0;
        }
        return value;
    }
};