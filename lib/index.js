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

const param = require('./param');

class Strategy extends EventEmitter {

    constructor(name, fileContent, params) {
        super();
        this.name = name;
        this.fileContent = fileContent;
        this.context = {
            kLine: [],
            cache: [],
            index: -1,
            fixed: 4,
            params: {},
            Global: {name},
            onError: this.onError.bind(this),
            inputParams: params,
        };
        try {
            this.script = new Script(`
            'use strict';
            try{
                ${this.fileContent}
            }catch(ex){
                onError(ex);
            }`, {filename: `${this.name}.vm`});
        } catch (ex) {
            this.onError(ex);
        }

        this.init();
    }

    init() {
        utils(this.context);
        math(this.context);
        log(this.context);
        param(this.context);
    }

    onError(ex) {
        this.error = ex;
    }

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

    endBar() {

    }

    getParams() {
        this.check();
        return this.context.params;
    }

    check() {
        if (this.error) return this.error;
        const sandbox = new vm.createContext(this.context);
        this.script.runInContext(sandbox);
        return this.error;
    }

}

module.exports = Strategy;