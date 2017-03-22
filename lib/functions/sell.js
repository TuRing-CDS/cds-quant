/**
 * Created by Z on 2017-03-22.
 */
function SELL(number) {
    let key = getKey('SELL(',number,')');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key,index);
        if(null===value){
            if(!this.tempSingal){
                this.tempSingal = {};
            }
            this.tempSingal['sell'] = number;
            this.singals[index] = {sell: number};
        }
    }.bind(this);
}

module.exports = SELL;