/**
 * Created by Z on 2016-12-13.
 */
const Strategy = require('../lib/strategy');
const path = require('path');
const fetch = require('node-fetch');
let demo = new Strategy('demo', path.join(__dirname, './code.js'));
//
// demo.onTick({open: 10, close: 11, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 10, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 12, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 13, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 9, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 6, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 23, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 14, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 22, low: 9, high: 12, volume: 100, turnover: 1000})
// demo.onTick({open: 10, close: 9, low: 9, high: 12, volume: 100, turnover: 1000})
let url = `https://api.cavacn.com/tools/stock/quotation/0.2/days/SH/600233`
fetch(url).then((res)=>{return res.json()}).then((json)=>{
    json.result.forEach(function(item){
        demo.onTick(item)
    })
    console.log("==>",demo.context.datas)
})
