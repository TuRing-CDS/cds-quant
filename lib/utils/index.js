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
        this.styles = {};
        this.graphs = {};
    }

    draw(name, type, value, style) {
        if (!this.lines) {
            this.lines = {};
        }
        if (!this.styles[name]) {
            this.styles[name] = {name: name, type: type, style: style};
        }
        this.lines[name] = typeof(value) == 'function' ? value() : value;
    }

    endTick() {
        // this.graphs.push({time: this.context.$.time, values: this.lines});
        this.graphs[this.context.$.time] = this.lines;
        if (this.lines) {
            delete this.lines;
        }
    }

    getResult() {
        return {
            styles: this.styles,
            values: this.graphs
        }
    }

    line(name, value, style) {
        this.draw(name, 'line', value, style || '#fff');
    }

    stick(name, value, style) {
        this.draw(name, 'stick', value, style || '#fff');
    }

    text(name, value, style) {
        this.draw(name, 'text', value, style || '#fff');
    }

}

class Stock {
    constructor(context) {
        this.context = context;
    }

    choose(value) {
        this.score = value;
    }

    getResult() {
        return typeof(this.score) == 'function' ? this.score() : this.score;
    }
}

class Utils {
    constructor(context) {
        this.context = context;
        this.context.log = new Log(this.context);
        this.context.draw = new Draw(this.context);
        this.context.stock = new Stock(this.context);
    }
}

module.exports = Utils;