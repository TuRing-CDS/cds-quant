// /**
//  * Created by Z on 2016-12-16.
//  */
// 'use strict'
//
// // let str = '(CLOSE - LLV[LOW, 9]) / (HHV[HIGH, 3] - LLV[LOW, 6]) * 100'
// let str = 'REF[COUNT[C<MA60,AA]=AA,1]'
// // let str = '1+((2+3)*4)-5'
// //  123+4*+5-
// // let str = '1+((2+3-4*5)*4)-5'
// // let str = 'a + b*c + (d * e + f) * g';
// // let str = '1+2*3+(4*5+6)*7';
// //  123*+45*6+7*+
// // var reg = /((?:\()|(?:\))|[^()]*(?:(?!)))/g;
// // let str = '2008-12-31'
//
// function isOperator(input) {
//     let operator = '+-*/(=<>';
//     return operator.indexOf(input) != -1;
// }
//
// function getPriority(input) {
//     switch (input) {
//         case '+':
//         case '-':
//             return 1;
//         case '*':
//         case '/':
//             return 2;
//         case '(':
//             return 3;
//         default:
//             return 0;
//     }
// }
//
// function npolan(str) {
//     let stack = [];
//     let queue = [];
//     let temp = [];
//     for (let i = 0, len = str.length; i < len; i++) {
//         let item = str[i].trim();
//         if (!item)continue;
//         if (isOperator(item)) {
//             if (temp.length) {
//                 queue.push(temp.join(''));
//                 temp = [];
//             }
//             let last = null;
//             if (getPriority(item) > getPriority(stack[stack.length - 1])) {
//                 stack.push(item)
//             } else {
//                 while ((last = stack.pop()) && last && getPriority(last) >= getPriority(item) && '(' != item && last) {
//                     if ('(' != last) {
//                         queue.push(last);
//                     } else {
//                         stack.push(last);
//                         break;
//                     }
//                 }
//                 stack.push(item)
//             }
//         } else {
//             if (')' == item) {
//                 let last = null;
//                 while ((last = stack.pop()) != '(' && last) {
//                     if ('(' != last) {
//                         queue.push(last);
//                     }
//                 }
//             } else {
//                 temp.push(item);
//             }
//         }
//     }
//     queue.push(temp.join(''));
//     queue = queue.concat(stack);
//     return queue;
// }
//
// // var array = npolan(str);
// // console.log(array)
// var result = [];
//
// var deal = function (array) {
//     let item = array.pop();
//     if (item) {
//         if ('*' == item) {
//             return 'MUL(' + deal(array) + ',' + deal(array) + ')';
//         } else if ('/' == item) {
//             return 'DIV(' + deal(array) + ',' + deal(array) + ')';
//         } else if ('-' == item) {
//             return 'SUB(' + deal(array) + ',' + deal(array) + ')';
//         } else if ('+' == item) {
//             return 'ADD(' + deal(array) + ',' + deal(array) + ')';
//         } else if ('=' == item) {
//             return 'EQ(' + deal(array) + ',' + deal(array) + ')';
//         } else if ('>' == item) {
//             return 'GT(' + deal(array) + ',' + deal(array) + ')';
//         } else if ('<' == item) {
//             return 'LT(' + deal(array) + ',' + deal(array) + ')';
//         }else{
//             return item;
//         }
//     }
// }
//
// // console.log(deal(array).replace(/\[/g, '(').replace(/\]/g, ')'))
//
// var str2 = 'SMA(MAX(CLOSE-LC,0),RSIN1,1)/SMA(ABS(CLOSE-LC),RSIN1,1)*100';
//
// var reg = /((?:\()|(?:\))|[^()]*(?:(?!)))/g;
// let temp = null;
// let array = [];
// while((temp = reg.exec(str2))!=null){
//     // console.log(temp[0])
//     if('('===temp[0]){
//         array.push(temp.index);
//     }else{
//         let index = array.pop();
//         console.log(str2.substr(index,temp.index-index+1))
//     }
// }
// // SMA(MAX(CLOSE-LC,0),RSIN1,1)/SMA(ABS(CLOSE-LC),RSIN1,1)*100;


let Parser = require('jison').Parser

var grammar = {
    lex: {
        rules: [
            ['\\s+', '/* skip whitespace*/'],
            ['[A-Z]+(?:\\.[A-Z]+)?', 'return "METHOD"'],
            ["\\+", "return '+'"],
            ["\\-", "return '-'"],
            ["\\*", "return '*'"],
            ["\\/", "return '/'"],
            ["\\(", "return '('"],
            ["\\)", "return ')'"],
            ['$', "return 'EOF'"]
        ]
    },
    operators:[
        ["left","+","-"],
    ],
    bnf: {
        expressions: [['e EOF', 'return $$']],
        e: [
            ['e + e', '$$ = String($1)+".ADD("+String($3)+")"'],
            ['e - e', '$$ = String($1)+".SUB("+String($3)+")"'],
            ['e * e', '$$ = String($1)+".MUL("+String($3)+")"'],
            ['e / e', '$$ = String($1)+".DIV("+String($3)+")"'],
            ['( e )', '$$ = ( String($2) )'],
            ['STRING', '$$ = String($1)'],
            ['METHOD', '$$ = String($1)']
        ]
    }
}

// let str = 'SMA(MAX(CLOSE-LC,0),RSIN1,1)/SMA(ABS(CLOSE-LC),RSIN1,1)*100';
let str = 'SMA(CLOSE-LC,6)';
// let str = '(3.14+3.24)/8.99';
// let str = '1+2/4*6';

let parser = new Parser(grammar);
console.log(parser.parse(str))

