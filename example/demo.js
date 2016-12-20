/**
 * Created by Z on 2016-12-13.
 */
const Strategy = require('../lib/strategy');
const path = require('path');
const fetch = require('node-fetch');

const Redis = require('redis');
const local = Redis.createClient(6379);
// local.zrange('SS.DAYS.600233.DATE.SSE.A_STOCK', 0, -1, function (err, result) {
//     // console.log(err, result.length)
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
//         console.log(demo.context.score);
//     })
//
// })

let url = `https://api.cavacn.com/tools/stock/quotation/0.2/days/SH/600233`
fetch(url).then((res)=>{return res.json()}).then((json)=>{
    let demo = new Strategy('demo', path.join(__dirname, './code.js'));
    json.result.forEach(function(item){
        demo.onTick(item)
    })
    console.log(demo.context.graphs.K.values)
    console.log("==>",demo.context.score);
    // demo.context.datas.forEach(function(item){
    //     console.log(item)
    // })
})


var getCodes = function (market, type, date, callback) {
    local.zrange(['SS', 'MARKET', 'CODE', date, market, type].join('.'), 0, -1, function (err, result) {
        callback(err, (result || []).map((x) => {
            return {market: market, type: type, code: x.split(',')[0]};
        }));
    });
}

var getAllCodes = function (date, callback) {
    getCodes('SZSE', 'A_STOCK', date, function (err, szse) {
        getCodes('SSE', 'A_STOCK', date, function (err, sse) {
            callback(err, szse.concat(sse));
        });
    });
}

var getDays = function (market, type, code, callback) {
    local.zrange(['SS', 'DAYS', code, 'DATE', market, type].join('.'), 0, -1, function (err, result) {
        callback(err, result.map((item) => {
            let items = item.split(',');
            return {
                time: parseFloat(items[0]),
                open: parseFloat(items[1]),
                low: parseFloat(items[2]),
                high: parseFloat(items[3]),
                close: parseFloat(items[4]),
                volume: parseFloat(items[5])
            }
        }))
    });
}

var deal = function () {
    getAllCodes('20161220', function (err, codes) {
        codes.forEach((code)=>{
            getDays(code.market, code.type, code.code, function (err, days) {
                let demo = new Strategy('demo', path.join(__dirname, './code.js'));
                console.time(`${code.market}:${code.code}`);
                days.forEach(function (item) {
                    demo.onTick(item)
                })
                console.timeEnd(`${code.market}:${code.code}`)
                console.log('SCORE', code.market, code.code, demo.context.score);
                fn(array, callback);
            });
        })
    });
}

// deal();

// getDays('SZSE','A_STOCK','000042',function(err,days){
//     let demo = new Strategy('demo', path.join(__dirname, './code.js'));
//     days.forEach(function (item) {
//         demo.onTick(item)
//     })
//     console.log('SCORE',  demo.context.score());
// })