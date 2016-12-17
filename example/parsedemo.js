/**
 * Created by Z on 2016-12-16.
 */
'use strict'

let str = '(CLOSE - LLV(LOW, 9)) / (HHV(HIGH, 3) - LLV(LOW, 6)) * 100;'
// let str = '2008-12-31'

var isIndexOf = function (str) {
    if (str.indexOf('-') != -1) {
        return '-';
    }
    if (str.indexOf('+') != -1) {
        return '+';
    }
    if (str.indexOf('*') != -1) {
        return '*';
    }
    if (str.indexOf('/') != -1) {
        return '/';
    }
    return null;
}

var fn = function (str) {
    var reg = /((?:\()|(?:\))|[^()]*(?:(?!)))/g;
    let item = null;
    var stack = [];
    var result = [];
    let current = 0;
    while ((item = reg.exec(str)) != null) {
        if (item[0] == '(') {
            stack.push(item.index);
            if (current) {
                result.push(str.substr(current + 1, item.index - current - 1))
                current = 0;
            }
        } else {
            let tmp = stack.pop();
            if (!stack.length) {
                current = item.index;
            }
            let substr = str.substr(tmp + 1, item.index - tmp - 1);
            let split = isIndexOf(substr);
            if (split) {
                let splitstrs = substr.split(split);
                splitstrs.splice(0, 0, '(');
                splitstrs.splice(2, 0, split);
                splitstrs.push(')')
                result = result.concat(splitstrs)
            }
        }
    }
    return result.map(function(item){
        return item.trim();
    });
}

console.log(fn(str).join(''));