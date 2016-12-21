/**
 * Created by Z on 2016-12-13.
 */
let N = 9;
let M1 = 3;
let M2 = 3;
let RSV = CLOSE.SUB(LLV(LOW, N)).DIV(HHV(HIGH, N).SUB(LLV(LOW, N))).MUL(100);
let K = SMA(RSV, M1, 1);
let D = SMA(K, M2, 1);
let J = MUL(K, 3).SUB(MUL(D, 2));
draw.line('K', K, '#ff00ff');
draw.line('D', D, '#ff66ff');
draw.line('J', J, '#ff99ff');
stock.choose(D);