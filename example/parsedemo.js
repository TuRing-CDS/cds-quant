/**
 * Created by Z on 2016-12-16.
 */
'use strict'

// let str = '(CLOSE - LLV[LOW, 9]) / (HHV[HIGH, 3] - LLV[LOW, 6]) * 100'
let str = 'REF[COUNT[C<MA60,AA]=AA,1]'
// let str = '1+((2+3)*4)-5'
//  123+4*+5-
// let str = '1+((2+3-4*5)*4)-5'
// let str = 'a + b*c + (d * e + f) * g';
// let str = '1+2*3+(4*5+6)*7';
//  123*+45*6+7*+
// var reg = /((?:\()|(?:\))|[^()]*(?:(?!)))/g;
// let str = '2008-12-31'

function isOperator(input) {
    let operator = '+-*/(=<>';
    return operator.indexOf(input) != -1;
}

function getPriority(input) {
    switch (input) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '(':
            return 3;
        default:
            return 0;
    }
}

function npolan(str) {
    let stack = [];
    let queue = [];
    let temp = [];
    for (let i = 0, len = str.length; i < len; i++) {
        let item = str[i].trim();
        if (!item)continue;
        if (isOperator(item)) {
            if (temp.length) {
                queue.push(temp.join(''));
                temp = [];
            }
            let last = null;
            if (getPriority(item) > getPriority(stack[stack.length - 1])) {
                stack.push(item)
            } else {
                while ((last = stack.pop()) && last && getPriority(last) >= getPriority(item) && '(' != item && last) {
                    if ('(' != last) {
                        queue.push(last);
                    } else {
                        stack.push(last);
                        break;
                    }
                }
                stack.push(item)
            }
        } else {
            if (')' == item) {
                let last = null;
                while ((last = stack.pop()) != '(' && last) {
                    if ('(' != last) {
                        queue.push(last);
                    }
                }
            } else {
                // queue.push(item);
                temp.push(item);
            }
        }
    }
    queue.push(temp.join(''));
    queue = queue.concat(stack);
    return queue;
}

// console.log(npolan(str).join(','))

var array = npolan(str);
console.log(array)
var result = [];

var deal = function (array) {
    let item = array.pop();
    if (item) {
        if ('*' == item) {
            return 'MUL(' + deal(array) + ',' + deal(array) + ')';
        } else if ('/' == item) {
            return 'DIV(' + deal(array) + ',' + deal(array) + ')';
        } else if ('-' == item) {
            return 'SUB(' + deal(array) + ',' + deal(array) + ')';
        } else if ('+' == item) {
            return 'ADD(' + deal(array) + ',' + deal(array) + ')';
        } else if ('=' == item) {
            return 'EQ(' + deal(array) + ',' + deal(array) + ')';
        } else if ('>' == item) {
            return 'GT(' + deal(array) + ',' + deal(array) + ')';
        } else if ('<' == item) {
            return 'LT(' + deal(array) + ',' + deal(array) + ')';
        }else{
            return item;
        }
    }
}

console.log(deal(array).replace(/\[/g, '(').replace(/\]/g, ')'))