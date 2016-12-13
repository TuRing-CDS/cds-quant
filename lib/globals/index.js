/**
 * Created by Z on 2016-12-13.
 */
class Globals {
    constructor(context) {
        this.context = context;
        this.context.CLOSE = '$.close';
        this.context.TIME = '$.time';
        this.context.OPEN = '$.open';
        this.context.LOW = '$.low';
        this.context.HIGH = '$.high';
        this.context.VOLUME = '$.volume';
        this.context.TURNOVER = '$.turnover';
        this.context.isType = function (name) {
            return function (obj) {
                return name === typeof( obj );
            }
        }

        this.context.isFunction = this.context.isType("function");

        this.context.isArray = this.context.isType("array");

        this.context.idObject = this.context.isType("object");

        this.context.isString = this.context.isType("string");

        this.context.isNumber = this.context.isType("number");

        this.context.getKey = function(){
            var sub = "";
            for(var key in arguments){
                if(!arguments[key]){
                    continue;
                }else if(isFunction(arguments[key])){
                    sub+="@"+arguments[key]("@@key");
                }else{
                    sub+="@"+arguments[key];
                }
            }
            return sub;
        }

        this.context.getValue = function( express, item ){
            var $ = item;
            var value = eval(express);
            return value;
        }

        global.isFunction = this.context.isFunction;
        global.isArray = this.context.isArray;
        global.idObject = this.context.idObject;
        global.isString = this.context.isString;
        global.getKey = this.context.getKey;
        global.getValue = this.context.getValue;
    }
}

let _globals = null;

module.exports = function () {
    if (null == _globals) {
        _globals = new Globals(this)
    }
    return _globals;
}