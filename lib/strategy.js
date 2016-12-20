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
        this.context = {kline: [], datas: [], index: -1, isMath: true, fixed: 4, score: 0, graphs: {}};
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

    }
}

module.exports = Strategy;