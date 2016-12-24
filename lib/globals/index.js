/**
 * Created by Z on 2016-12-13.
 */
'use strict'
class Globals {
    constructor(context) {
        this.context = context;
        // this.context.CLOSE = '$.close';
        // this.context.TIME = '$.time';
        // this.context.OPEN = '$.open';
        // this.context.LOW = '$.low';
        // this.context.HIGH = '$.high';
        // this.context.VOLUME = '$.volume';
        // this.context.TURNOVER = '$.turnover';
        this.context.isType = function (name) {
            return function (obj) {
                return name === typeof( obj );
            }
        }

        this.context.getKey = function(){
            // var sub = "";
            var subs = [];
            for(var key in arguments){
                if(!arguments[key]){
                    continue;
                }else if(isFunction(arguments[key])){
                    subs.push(arguments[key]('@@key'));
                }else{
                    subs.push(arguments[key]);
                }
            }
            return subs.join('');
        }

        this.context.getValue = function( express, item ){
            var $ = item;
            var value = eval(express);
            return value;
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
    }
}

module.exports = Globals;