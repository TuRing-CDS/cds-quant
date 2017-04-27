/**
 * Created by Z on 2017-04-26.
 */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fs = require('fs');
const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient();

if (cluster.isMaster) {
    const url = `http://api.cavacn.com:8888/tools/stock/quotation/0.2/days/SH/600233`;
    let channels = [];
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        for (let k = 0; k < 2000; k++) {
            let channel = 'channel' + [i, k].join('_');
            worker.send(channel);
            channels.push(channel);
        }
    }
    // setTimeout(()=>{
    //     console.log('begin');
    //     fetch(url).then((res) => res.json()).then((json) => {
    //         json.result.forEach((kline) => {
    //             channels.forEach((channel) => {
    //                 client.publish(channel, JSON.stringify(kline));
    //             });
    //         });
    //
    //     });
    // },10000)
    setInterval(() => {
        channels.forEach((channel) => {
            client.publish(channel, JSON.stringify({
                time: Date.now(),
                open: 10,
                low: 9.8,
                high: 10.2,
                close: 10.1,
                volume: 1000,
                turnover: 10000
            }));
        });
    },1000)
} else {
    const fs = require('fs');
    const Strategy = require('../lib');
    const strategies = new Map();
    const content = fs.readFileSync('./code.js').toString();
    console.log(`${process.pid} is running`);
    client.on('message', (channel, message) => {
        // console.log(channel,message);
        strategies.has(channel) && strategies.get(channel).onBar(JSON.parse(message));
    });
    process.on('message', (channel) => {
        // console.log(`${process.pid}:${strategies.size}`);
        const demo = new Strategy(channel, content, {});
        strategies.set(channel, demo);
        client.subscribe(channel);
    });
}