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

console.log('===>语法错误', demo.check());


let url = `http://api.cavacn.com:8888/tools/stock/quotation/0.2/days/SH/600233`;

fetch(url).then((res) => {
    return res.json();
}).then((json) => {
    json.result.forEach((item) => {
        item.value = 1000000;
        demo.onBar(item);
        console.log('===>', demo.getScore());
    })
});