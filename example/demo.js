/**
 * Created by Z on 2017-04-25.
 */
const Strategy = require('../lib');

const fs = require('fs');

const fetch = require('node-fetch');

const demo = new Strategy('demo', fs.readFileSync('./code.js').toString(), {b: 30});

// console.log('===>语法错误', demo.check());


let url = `http://api.cavacn.com:8888/tools/stock/quotation/0.2/days/SH/600233`;

fetch(url).then((res) => {
    return res.json();
}).then((json) => {
    json.result.forEach((item) => {
        demo.onBar(item);
        console.log('===>',demo.getScore());
    })
});