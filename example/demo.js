/**
 * Created by Z on 2017-04-25.
 */
const Strategy = require('../lib');

const fs = require('fs');

const fetch = require('node-fetch');

const opts = {cache: {maxLength: 10}};

const custom = require('./custom');
// const opts = {};

const demo = new Strategy('demo', fs.readFileSync('./code.js').toString(), opts, {b: 30});

demo.loadCustomModel(custom);

console.log('===>', '语法检查:', demo.check());
console.log('===>', '参数检查:', demo.getParams());


let url = `http://api.cavacn.com:8888/tools/stock/quotation/0.2/days/SH/600233`;

fetch(url).then((res) => {
    return res.json();
}).then((json) => {
    json.result.forEach((item) => {
        item.value = 1000000;
        item.concepts = ['00001', '00002'];
        demo.onBar(item);
        if(demo.error){
            console.log(demo.error)
        }
    });
    console.log('===>', demo.getScore());
});