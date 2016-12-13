/**
 * Created by Z on 2016-12-13.
 */
'use strict'

const co = require('co');

let namespace = function (_namespace) {
    return function () {
        return console.log.apply(null, [_namespace].concat(Array.prototype.slice.call(arguments)));
    }
}

const INFO = '[INFO ]';
const WARN = '[WARN ]';
const ERROR = '[ERROR]';

class Log {
    constructor(context) {
        this.context = context;
    }

    info() {
        return namespace(INFO).apply(this, arguments);
    }

    warn() {
        return namespace(WARN).apply(this, arguments);
    }

    error() {
        return namespace(ERROR).apply(this, arguments);
    }
}

class Utils {
    constructor(context) {
        this.context = context;
        this.context.log = new Log(this.context);
        this.context.co = co;
    }
}

let _utils = null;

module.exports = function () {
    if (null == _utils) {
        _utils = new Utils(this)
    }
    return _utils;
}