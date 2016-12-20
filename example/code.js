/**
 * Created by Z on 2016-12-13.
 */
let N = 9;
let M1 = 3;
let M2 = 3;
let RSV = CLOSE.SUB(LLV(LOW, N)).DIV(HHV(HIGH, N).SUB(LLV(LOW, N))).MUL(100);
let K = SMA(RSV, M1, 1);
let D = SMA(K, M2, 1);
let J = K * 3 - D * 2;
log.info(K, D, J)
score = K;