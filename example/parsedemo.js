/**
 * Created by Z on 2016-12-16.
 */
'use strict'

let str = 'let RSV = (CLOSE - LLV(LOW, 9)) / (HHV(HIGH, 3) - LLV(LOW, 6)) * 100;'
// let str = '2008-12-31'

var fn = function () {
    //$regex = '/('.'(?:[^()]|/(' x $depth . '[^()]*' . '/))*' x $depth .'/)';
    // var reg = /((?<mm>\()|(?<−mm>)|[^()])*(?(mm)(?!))\)/;
    // var reg = /((?:\()|(?:-)|[^()]*(?:(?!)))/;
    var reg = /((?:\()|(?:\))|[^()]*(?:(?!)))/g;
    console.log(str.match(reg));
    let item = null;
    let temp = {};
    let array = [];
    let result = [];
    while ((item = reg.exec(str)) != null) {
        if (item[0] == '(') {
            array.push({begin: item.index});
        } else {
            let temp = array.pop();
            temp.end = item.index;
            result.push(temp);
        }
    }
    result = result.map((item) => {
        return str.substr(item.begin, item.end - item.begin + 1)
    })
    // result = result.map((item) => {
    //     if(item.indexOf('-')!=-1){
    //         return 'SUB'+item.replace('-',',');
    //     }
    //     if(item.indexOf('+')!=-1){
    //         return 'ADD'+item.replace('+',',');
    //     }
    //     if(item.indexOf('*')!=-1){
    //         return 'MUL'+item.replace('*',',');
    //     }
    //     if(item.indexOf('/')!=-1){
    //         return 'DEV'+item.replace('/',',');
    //     }
    // })
    console.log(result)
}
fn();