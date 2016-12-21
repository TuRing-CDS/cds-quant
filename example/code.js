/**
 * Created by Z on 2016-12-13.
 */

// KDJ

// let N = 9;
// let M1 = 3;
// let M2 = 3;
// let RSV = CLOSE.SUB(LLV(LOW, N)).DIV(HHV(HIGH, N).SUB(LLV(LOW, N))).MUL(100);
// let K = SMA(RSV, M1, 1);
// let D = SMA(K, M2, 1);
// let J = MUL(K, 3).SUB(MUL(D, 2));
// draw.line('K', K, '#ff00ff');
// draw.line('D', D, '#ff66ff');
// draw.line('J', J, '#ff99ff');
// stock.choose(D);


// CCI
let N = 14;
// let TYP = (HIGH + LOW + CLOSE)/3;
let TYP = DIV(ADD(HIGH,ADD(LOW,CLOSE)),3);
// (TYP-MA(TYP,N))/(0.015*AVEDEV(TYP,N));
let CCI = DIV(SUB(TYP,MA(TYP,N)),MUL(0.015,AVERAGE(TYP,N)));
log.info('CCI',AVERAGE(CLOSE,N));