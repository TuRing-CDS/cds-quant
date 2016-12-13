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
}

let _math = null;

module.exports = function () {
    if (null == _math) {
        _math = new Math(this)
    }
    return _math;
}