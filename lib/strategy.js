/**
 * Created by Z on 2016-12-13.
 */
'use strict'
const fs = require('fs');
const utils = require('./utils')
const math = require('./math')
const globals = require('./globals')
const vm = require('vm');
const Script = vm.Script;

class Strategy {
    constructor(name, file) {
        this.name = name;
        this.file = file;
        this.context = {kline: [], datas: [], index: -1};
        // this.fileContent = `'use strict'\r\nco(function *(){ ${fs.readFileSync(this.file, 'utf8').toString()} }).catch(function(err){log.error(err)});`;
        this.fileContent = `try{${fs.readFileSync(this.file, 'utf8').toString()};}catch(err){log.error(err.stack);}`;
        this.script = new Script(this.fileContent, {filename: `${this.name}.vm`});
        this.onInit();
    }

    onInit() {
        globals.apply(this.context);
        utils.apply(this.context);
        math.apply(this.context);
    }

    onTick(kline) {
        //Kline-Data
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