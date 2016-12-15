/**
 * Created by Z on 2016-12-15.
 */
Function.prototype.add = function(a){
    return this + '+' + a;
}

var fn = function(){
    var f = function(){
        return 'fn1'
    }
    f.valueOf = function(){
        return this;
    }
    return f;
}

console.log(fn.add(fn))