/**
 * Created by Z on 2016-12-13.
 */
// // MACD
let SHORT = 12;
let LONG = 26;
let M = 9;
let DIFF = SUB(EMA(CLOSE, SHORT), EMA(CLOSE, LONG));
let DEA = EMA(DIFF, M);
let MACD = MUL(2, SUB(DIFF, DEA));
// log.info(DIFF, DEA, MACD);
draw.line('DIFF', DIFF, {color: '#ff00ff', screen: 'sc1'});
draw.stick('MACD', MACD, {bear: {color: 'green'}, bull: {color: 'red'}, screen: 'sc1'});
draw.line('DEA', DEA, {color: '#00ffff', screen: 'sc1'});

// KDJ
let N = 9;
let M1 = 3;
let M2 = 3;
let RSV = CLOSE.SUB(LLV(LOW, N)).DIV(HHV(HIGH, N).SUB(LLV(LOW, N))).MUL(100);
let K = SMA(RSV, M1, 1);
let D = SMA(K, M2, 1);
let J = MUL(K, 3).SUB(MUL(D, 2));
draw.line('K', K, {color: '#ff00ff', screen: 'sc2'});
draw.line('D', D, {color: '#ff66ff', screen: 'sc2'});
draw.line('J', J, {color: '#ff99ff', screen: 'sc2'});
stock.choose(K);

// CCI
let N2 = 14;
let TYP = DIV(ADD(HIGH, ADD(LOW, CLOSE)), 3);
let CCI = DIV(SUB(TYP, MA(TYP, N2)), MUL(0.015, AVERAGE(TYP, N2)));
draw.line('CCI', CCI, {color: '#ff0000', screen: 'sc3'});