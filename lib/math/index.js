/**
 * Created by Z on 2016-12-13.
 */
'use strict'

const ABS = require('./functions/abs')
const CROSS = require('./functions/cross')
const EMA = require('./functions/ema')
const HHV = require('./functions/hhv')
const LLV = require('./functions/llv')
const MA = require('./functions/ma')
const MEMA = require('./functions/mema')
const REF = require('./functions/ref')
const SLOPE = require('./functions/slope')
const SMA = require('./functions/sma')
const COUNT = require('./functions/count')
const LT = require('./functions/lt')
const GT = require('./functions/gt')
const EQ = require('./functions/eq')
const CLOSE = require('./functions/close')
const OPEN = require('./functions/open')
const LOW = require('./functions/low')
const HIGH = require('./functions/high')
const VOLUME = require('./functions/volume')
const BARSLAST = require('./functions/barslast')
const DIV = require('./functions/div')

class Math {
    constructor(context) {
        this.context = context;
        this.context.ABS = this.ABS.bind(this);
        this.context.CROSS = this.CROSS.bind(this);
        this.context.EMA = this.EMA.bind(this);
        this.context.HHV = this.HHV.bind(this);
        this.context.LLV = this.LLV.bind(this);
        this.context.MA = this.MA.bind(this);
        this.context.MEMA = this.MEMA.bind(this);
        this.context.REF = this.REF.bind(this);
        this.context.SLOPE = this.SLOPE.bind(this);
        this.context.SMA = this.SMA.bind(this);
        this.context.COUNT = this.COUNT.bind(this);
        this.context.LT = this.LT.bind(this);
        this.context.GT = this.GT.bind(this);
        this.context.EQ = this.EQ.bind(this);
        this.context.CLOSE = this.context.C = this.CLOSE.bind(this);
        this.context.OPEN = this.context.O = this.OPEN.bind(this);
        this.context.HIGH = this.context.H = this.HIGH.bind(this);
        this.context.LOW = this.context.L = this.LOW.bind(this);
        this.context.VOLUME = this.context.VOL = this.VOLUME.bind(this);
        this.context.BARSLAST = this.BARSLAST.bind(this);
        this.context.DIV = this.DIV.bind(this);
    }

    ABS() {
        return ABS.apply(this.context, arguments)
    }

    CROSS() {
        return CROSS.apply(this.context, arguments)
    }

    EMA() {
        return EMA.apply(this.context, arguments)
    }

    HHV() {
        return HHV.apply(this.context, arguments)
    }

    LLV() {
        return LLV.apply(this.context, arguments)
    }

    MA() {
        return MA.apply(this.context, arguments)
    }

    MEMA() {
        return MEMA.apply(this.context, arguments)
    }

    REF() {
        return REF.apply(this.context, arguments)
    }

    SLOPE() {
        return SLOPE.apply(this.context, arguments)
    }

    SMA() {
        return SMA.apply(this.context, arguments)
    }

    COUNT() {
        return COUNT.apply(this.context, arguments)
    }

    LT() {
        return LT.apply(this.context, arguments)
    }

    GT() {
        return GT.apply(this.context, arguments)
    }

    EQ() {
        return EQ.apply(this.context, arguments)
    }

    CLOSE() {
        return CLOSE.apply(this.context, arguments)
    }

    OPEN() {
        return OPEN.apply(this.context, arguments)
    }

    HIGH() {
        return HIGH.apply(this.context, arguments)
    }

    LOW() {
        return LOW.apply(this.context, arguments)
    }

    VOLUME() {
        return VOLUME.apply(this.context, arguments)
    }

    BARSLAST() {
        return BARSLAST.apply(this.context, arguments)
    }

    DIV() {
        return DIV.apply(this.context, arguments)
    }
}

let _math = null;

module.exports = function () {
    if (null == _math) {
        _math = new Math(this)
    }
    return _math;
}