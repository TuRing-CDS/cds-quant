/**
 * Created by Z on 2016-12-13.
 */


// MA20:=EMA(CLOSE,20);
// MA40:=EMA(CLOSE,40);
// MA60:=EMA(CLOSE,60);
// AA:=BARSLAST(MA40>MA60 AND(MA20=MA40 OR MA20>MA40));
// BB:=REF(COUNT(C<MA60,AA)=AA,1);
// CC:=CROSS(CLOSE,MA60) AND VOL > MA(VOL,5) and (CLOSE-REF(CLOSE,1))/REF(CLOSE,1)*100>3;
// FRCS:BB AND CC;

// log.info(yield SLOPE(HHV(CLOSE,5),5));

// let Ma20 = EMA(CLOSE, 20);
// let Ma40 = EMA(CLOSE, 40);
// let Ma60 = EMA(CLOSE, 60);
// log.info(yield COUNT(GT(CLOSE,OPEN),20));
// log.info(yield COUNT(GT(CLOSE(),OPEN()),20));
log.info(yield MA(C(),20));
// log.info(yield ABS(GT(CLOSE,OPEN),20));
// let AA = BARSLAST(yield Ma40 > yield Ma60 && ( yield Ma20 = Ma40 || Ma20 > Ma40));
// let BB = REF(COUNT(yield CLOSE < yield Ma60, yield AA) = AA, 1);
// let CC = CROSS(CLOSE,Ma60) && VOLUME > yield MA(VOLUME,5) && (CLOSE-REF(CLOSE,1))/REF(CLOSE,1)*100 > 3;
// let FRCS: yield BB && yield CC;
