'use strict'

const ABS = require('./abs')
const CROSS = require('./cross')
const EMA = require('./ema')
const HHV = require('./hhv')
const LLV = require('./llv')
const MA = require('./ma')
const MEMA = require('./mema')
const REF = require('./ref')
const SLOPE = require('./slope')
const SMA = require('./sma')
const COUNT = require('./count')
const LT = require('./lt')
const GT = require('./gt')
const EQ = require('./eq')
const CLOSE = require('./close')
const OPEN = require('./open')
const LOW = require('./low')
const HIGH = require('./high')
const VOLUME = require('./volume')
const BARSLAST = require('./barslast')
const DIV = require('./div')
const AND = require('./and')
const OR = require('./or')
const TIME = require('./time')
const ADD = require('./add')
const SUB = require('./sub')
const MUL = require('./mul')
const AVERAGE = require('./average')
const MAX = require('./max')
const IF = require('./if')
const SUM = require('./sum')
/**
 * MATH
 */
class Math {
    constructor(context) {
        this.context = context;
        let self = this;
        Function.prototype.valueOf = function () {
            let value = this();
            if (typeof(value) == "number") {
                return value.toFixed(self.context.fixed || 3);
            }
            return value;
            // return parseFloat(this().toFixed(self.context.fixed || 3));
        }
        Function.prototype.GT = function (other) {
            return self.context.GT(this, other);
        }
        Function.prototype.LT = function (other) {
            return self.context.LT(this, other);
        }
        Function.prototype.EQ = function (other) {
            return self.context.EQ(this, other);
        }
        Function.prototype.ADD = function (other) {
            return self.context.ADD(this, other);
        }
        Function.prototype.SUB = function (other) {
            return self.context.SUB(this, other);
        }
        Function.prototype.MUL = function (other) {
            return self.context.MUL(this, other);
        }
        Function.prototype.DIV = function (other) {
            return self.context.DIV(this, other);
        }
        Function.prototype.AND = function (other) {
            return self.context.AND(this, other);
        }
        Function.prototype.OR = function (other) {
            return self.context.OR(this, other);
        }
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
        this.context.TIME = this.TIME.bind(this)();
        this.context.CLOSE = this.context.C = this.CLOSE.bind(this)();
        this.context.OPEN = this.context.O = this.OPEN.bind(this)();
        this.context.HIGH = this.context.H = this.HIGH.bind(this)();
        this.context.LOW = this.context.L = this.LOW.bind(this)();
        this.context.VOLUME = this.context.VOL = this.VOLUME.bind(this)();
        this.context.BARSLAST = this.BARSLAST.bind(this);
        this.context.AND = this.AND.bind(this);
        this.context.OR = this.OR.bind(this);
        this.context.ADD = this.ADD.bind(this);
        this.context.SUB = this.SUB.bind(this);
        this.context.DIV = this.DIV.bind(this);
        this.context.MUL = this.MUL.bind(this);
        this.context.AVERAGE = this.AVERAGE.bind(this);
        this.context.MAX = this.MAX.bind(this);
        this.context.IF = this.IF.bind(this);
        this.context.SUM = this.SUM.bind(this);
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

    AND() {
        return AND.apply(this.context, arguments)
    }

    OR() {
        return OR.apply(this.context, arguments)
    }

    TIME() {
        return TIME.apply(this.context, arguments)
    }

    ADD() {
        return ADD.apply(this.context, arguments)
    }

    SUB() {
        return SUB.apply(this.context, arguments)
    }

    MUL() {
        return MUL.apply(this.context, arguments)
    }

    AVERAGE() {
        return AVERAGE.apply(this.context, arguments)
    }

    MAX() {
        return MAX.apply(this.context, arguments)
    }

    IF() {
        return IF.apply(this.context, arguments)
    }

    SUM() {
        return SUM.apply(this.context, arguments)
    }
}

module.exports = Math;