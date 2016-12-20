/**
 * Created by Z on 2016-12-13.
 */
const Strategy = require('../lib/strategy');
const path = require('path');
const fetch = require('node-fetch');
let demo = new Strategy('demo', path.join(__dirname, './code.js'));
// const Redis = require('redis');
// const local = Redis.createClient();
// local.zrange('SS.DAYS.600233.DATE.SSE.A_STOCK', 0, -1, function (err, result) {
//     console.log(err, result.length)
//     result.map((item) => {
//         let items = item.split(',');
//         return {
//             time: parseFloat(items[0]),
//             open: parseFloat(items[1]),
//             low: parseFloat(items[2]),
//             high: parseFloat(items[3]),
//             close: parseFloat(items[4]),
//             volume: parseFloat(items[5])
//         }
//     }).forEach((item) => {
//         // console.log(new Date(item.time),item)
//         demo.onTick(item);
//     })
// })

let url = `https://api.cavacn.com/tools/stock/quotation/0.2/days/SH/600233`
fetch(url).then((res)=>{return res.json()}).then((json)=>{
    json.result.forEach(function(item){
        demo.onTick(item)
    })
    console.log("==>",demo.context.score);
    // demo.context.datas.forEach(function(item){
    //     console.log(item)
    // })
})
