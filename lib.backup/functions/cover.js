/**
 * Created by Z on 2017-03-22.
 */
function COVER(number) {
    let key = getKey('COVER(',number,')');
    return function (index) {
        index = index || this.index;
        let value = getCache.bind(this)(key,index);
        if(null===value){
            if(!this.tempSingal){
                this.tempSingal = {};
            }
            this.tempSingal['cover'] = number;
            this.singals[index] = {cover: number};
        }
    }.bind(this);
}

module.exports = COVER;