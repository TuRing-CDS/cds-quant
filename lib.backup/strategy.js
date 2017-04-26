'use strict'
const utils = require('./utils');
const math = require('./functions');
const globals = require('./globals');
const vm = require('vm');
const Script = vm.Script;
/**
 * Strategy
 */
class Strategy {
    constructor(name, content, params) {
        this.name = name;
        this.fileContent = content;
        this.context = {
            kline: [],
            datas: [],
            index: -1,
            isMath: true,
            fixed: 4,
            graphs: [],
            params: {},
            singals: [],
            tempSingal: null,
            inputParams: params || {}
        };
        this.error = null;
        this.onInit();
        this.script = new Script(`'use strict';try{${this.fileContent}}catch(err){onError(err);}`, {filename: `${this.name}.vm`});

    }

    onInit() {
        new globals(this.context);
        new utils(this.context);
        new math(this.context);
    }

    onError(err) {
        this.error = err;
    }

    onTick(kline) {
        if (!this.error) {
            this.context.$ = kline;
            this.context.kline.push(kline);
            this.context.datas.push({});
            this.context.index++;
            this.context.onError = this.onError.bind(this);
            let sandbox = new vm.createContext(this.context);
            this.script.runInContext(sandbox);
            this.endTick();
        } else {
            throw this.error
        }
    }

    endTick() {
        this.context.draw.endTick();
        if (!!this.context.tempSingal) {
            this.context.singals.push(this.context.tempSingal)
        }
        this.context.tempSingal = null;
    }

    getResult() {
        let draws = this.context.draw.getResult();
        return {
            styles: draws.styles,
            score: this.context.score.getResult(),
            values: this.context.kline.map(function (item) {
                let values = {
                    time: item.time,
                    open: item.open,
                    low: item.low,
                    high: item.high,
                    close: item.close,
                    volume: item.volume
                }
                if (draws.values[item.time]) {
                    Object.keys(draws.values[item.time]).forEach(function (sub) {
                        values[sub] = draws.values[item.time][sub];
                    })
                }
                return values;
            })
        };
    }

    getParams() {
        return this.context.params || {};
    }

    getCurrentSingal(){
        return this.context.singals[this.context.index];
    }

    getSingals() {
        return this.context.singals;
    }
}

module.exports = Strategy;