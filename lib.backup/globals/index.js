'use strict'
class Globals {
    constructor(context) {
        this.context = context;
        this.context.isType = function (name) {
            return function (obj) {
                return name === typeof( obj );
            }
        }

        this.context.getKey = function () {
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
        }

        this.context.getValue = function (express, item) {
            return express;
        }

        this.context.isFunction = this.context.isType("function");

        this.context.isArray = this.context.isType("array");

        this.context.idObject = this.context.isType("object");

        this.context.isString = this.context.isType("string");

        this.context.isNumber = this.context.isType("number");


        global.isFunction = this.context.isFunction;
        global.isArray = this.context.isArray;
        global.idObject = this.context.idObject;
        global.isString = this.context.isString;
        global.isNumber = this.context.isNumber;
        global.getKey = this.context.getKey;
        global.getValue = this.context.getValue;
        global.getCache = function (key, index) {
            if ('@@key' === index) {
                return key;
            }
            if (index < 0) {
                return 0;
            }
            if (undefined !== this.datas[index][key]) {
                return this.datas[index][key];
            }
            return null;
        }
        global.calculation = function (express, index) {
            let value = 0;
            let current = this.kline[index] || this.current;
            if (isFunction(express)) {
                value = express(index);
            } else if (isString(express)) {
                value = getValue(express, current);
            } else if (isNumber(express)) {
                value = express;
            }
            return value;
        }
        global.checkValue = function (key, index, value) {
            if (isNaN(value) || Infinity === value || -Infinity === value) {
                value = 0;
            }
            this.datas[index][key] = value;
            return value;
        }

    }
}

module.exports = Globals;