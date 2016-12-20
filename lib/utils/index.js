/**
 * Created by Z on 2016-12-13.
 */
'use strict'

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

class Draw {
    constructor(context) {
        this.context = context;
    }

    draw(name, type, value, color) {
        if (!this.context.graphs[name]) {
            this.context.graphs[name] = {color: color, type: type, values: []};
        }
        this.context.graphs[name].values.push({time: this.context.$.time, value: isFunction(value) ? value() : value});
    }

    line(name, value, color) {
        this.draw(name, 'line', value, color || '#fff');
    }

    stick(name, value, color) {
        this.draw(name, 'stick', value, color || '#fff');
    }

}

class Utils {
    constructor(context) {
        this.context = context;
        this.context.log = new Log(this.context);
        this.context.draw = new Draw(this.context);
    }
}

module.exports = Utils;