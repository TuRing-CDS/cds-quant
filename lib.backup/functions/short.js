/**
 * Created by Z on 2017-03-22.
 */
function SHORT(number) {
    let key = getKey('SHORT(', number, ')');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key, index);
        if (null === value) {
            if (!this.tempSingal) {
                this.tempSingal = {};
            }
            this.tempSingal['short'] = number;
            this.singals[index]  = {short: number};
        }
    }.bind(this);
}

module.exports = SHORT;