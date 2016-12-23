/**
 * Created by Z on 2016-12-13.
 */
'use strict'
const fs = require('fs');
const utils = require('./utils')
const math = require('./functions')
const globals = require('./globals')
const vm = require('vm');
const Script = vm.Script;

class Strategy {
    constructor(name, file) {
        this.name = name;
        this.file = file;
        this.context = {kline: [], datas: [], index: -1, isMath: true, fixed: 4, graphs: []};
        this.onInit();
        this.fileContent = `try{${fs.readFileSync(this.file, 'utf8').toString()};}catch(err){log.info(err);}`;
        this.script = new Script(this.fileContent, {filename: `${this.name}.vm`});

    }

    onInit() {
        new globals(this.context);
        new utils(this.context);
        new math(this.context);
    }

    onTick(kline) {
        this.context.$ = kline;
        this.context.kline.push(kline);
        this.context.datas.push({});
        this.context.index++;
        let sandbox = new vm.createContext(this.context);
        this.script.runInContext(sandbox);
        this.endTick();
    }

    endTick() {
        this.context.draw.endTick();
    }

    getResult() {
        // console.log(this.context.kline);
        // console.log(this.context.draw.getResult());
        let self = this;
        let draws = this.context.draw.getResult();
        // console.log(draws)
        return {
            styles: draws.styles,
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
}

module.exports = Strategy;