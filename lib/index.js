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

class Strategy extends EventEmitter {

    constructor(name, fileContent, params) {
        super();
        this.name = name;
        this.fileContent = fileContent;
        this.context = {
            kLine: [],
            cache: [],
            index: -1,
            isMath: true,
            fixed: 4,
            graphs: [],
            singal: [],
            currentSingal: null,
            importParams: params
        };
        this.script = new Script(`
        'use strict';
        try{
            ${this.fileContent}
        }catch(ex){
            onError(ex);
        }
        `, {filename: `${this.name}.vm`});

        this.init();
    }

    init() {
        utils(this.context);
        math(this.context);
        log(this.context);
    }

    onBar(kline) {
        if (!this.error) {
            this.context.$ = kline;
            this.context.kLine.push(kline);
            this.context.cache.push({});
            this.context.index++;
            this.context.onError = function (ex) {
                console.log(ex);
            };
            let sandbox = new vm.createContext(this.context);
            this.script.runInContext(sandbox);
        }
    }

}

module.exports = Strategy;