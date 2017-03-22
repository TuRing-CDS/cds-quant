/**
 * Created by Z on 2017-03-22.
 */
function BUY(number) {
    let key = getKey('BUY(',number,')');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key,index);
        if(null===value){
            if(!this.tempSingal){
                this.tempSingal = {};
            }
            this.tempSingal['buy'] = number;
            this.singals[index]  = {buy: number};
        }
    }.bind(this);
}

module.exports = BUY;