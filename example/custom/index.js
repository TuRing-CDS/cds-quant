/**
 * Created by Z on 2017-04-28.
 */
module.exports = function (context) {

    /**
     * 市值
     * @type {VALUE}
     */
    context.value = context.VALUE = function () {
        const key = context.getKey('VALUE');
        return function (index) {
            index = index || this.index;
            let value = this.getCache(key, index);
            if (null === value) {
                let current = this.kLine[index] || this.current;
                value = this.checkValue(current.value);
            }
            return value;
        }.bind(context);
    }();
};