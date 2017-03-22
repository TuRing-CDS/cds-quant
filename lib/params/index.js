/**
 * Created by Z on 2017-03-22.
 */
class Params {
    constructor(context) {
        this.context = context;
        this.context.PARAM = this.param.bind(this.context);
        if (!this.context.params) {
            this.context.params = {};
        }
    }

    param(paramName, opts) {
        this.params[paramName] = opts;
        return opts.default || 0;
    }
}

module.exports = Params;