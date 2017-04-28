/**
 * Created by Z on 2017-04-25.
 */
'use strict';
const vm = require('vm');

const Script = vm.Script;

const EventEmitter = require('events').EventEmitter;

const math = require('./math');

const utils = require('./utils');

const log = require('./log');

const constant = require('./constant');

const param = require('./param');

const score = require('./score');

class Strategy extends EventEmitter {

    constructor(name, fileContent, opts, params) {
        super();
        this.name = name;
        this.opts = Object.assign({cache: {maxLength: 1000}}, opts);
        console.log(this.opts)
        this.fileContent = fileContent;
        this.context = {
            /**
             * K线数据
             */
            kLine: [],
            /**
             * 缓存数据
             */
            cache: [],
            /**
             * 当前索引
             */
            index: -1,
            /**
             * 数字格式化
             */
            fixed: 4,
            /**
             * 参数
             */
            params: {},
            /**
             * 用户自定义代码global
             */
            Global: {name},
            /**
             * 错误异常捕获
             */
            onError: this.onError.bind(this),
            /**
             * 传入参数
             */
            inputParams: params,
            /**
             * 评分
             */
            _score: 0
        };
        try {
            /**
             * 自定义代码块
             * @type {vm.Script}
             */
            this.script = new Script(`
            'use strict';
            try{
                ${this.fileContent}
            }catch(ex){
                onError(ex);
            }`, {filename: `${this.name}.vm`});
        } catch (ex) {
            /**
             * 捕获语法错误
             */
            this.onError(ex);
        }
        /**
         * 初始化
         */
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        /**
         * 通用模块
         */
        utils(this.context);
        /**
         * 数学运算模块
         */
        math(this.context);
        /**
         * 日志模块
         */
        log(this.context);
        /**
         * 参数模块
         */
        param(this.context);
        /**
         * 常量模块
         */
        constant(this.context);
        /**
         * 评分模块
         */
        score(this.context);
    }

    /**
     * 异常捕获
     * @param ex
     */
    onError(ex) {
        this.error = ex;
    }

    /**
     * onBar逻辑
     * @param kline
     * @returns {{kLine: Array, cache: Array, index: number, fixed: number, params: {}, Global: {name: *}, signal: {}, onError: (function(this:Strategy)), inputParams: *}|*}
     */
    onBar(kline) {
        if (!this.error) {
            this.context.$ = kline;
            this.context.kLine.push(kline);
            this.context.cache.push({});
            this.context.index++;
            const sandbox = new vm.createContext(this.context);
            this.script.runInContext(sandbox);
            this.endBar();
        }
        return this.context;
    }

    /**
     * EndBar逻辑,清除上一周期数据
     */
    endBar() {
        this.context._score = 0;
    }

    /**
     * 得到参数
     * @returns {Strategy.context.params|{}}
     */
    getParams() {
        this.check();
        return this.context.params;
    }

    /**
     * 得到评分
     * @returns {number}
     */
    getScore() {
        return this.context._score;
    }

    /**
     * 检查用户自定义代码块
     * @returns {*}
     */
    check() {
        if (this.error) return this.error;
        const sandbox = new vm.createContext(this.context);
        this.script.runInContext(sandbox);
        return this.error;
    }

}

module.exports = Strategy;