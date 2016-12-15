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

// let Ma20 = EMA('$.close', 20);
// let Ma40 = EMA('$.close', 40);
// let Ma60 = EMA('$.close', 60);
log.info(CLOSE.ADD(OPEN));
// log.info(yield COUNT(GT(CLOSE(),OPEN()),20));
// log.info(yield BARSLAST(GT(DIV(CLOSE(),REF(CLOSE(),1)),1.1)));
// log.info(yield Ma20,yield Ma40,yield Ma60);
// log.info(yield ABS(GT(CLOSE,OPEN),20));
// let AA = BARSLAST(GT(Ma40, Ma60), OR(EQ(Ma20, Ma40), GT(Ma20, Ma40)));
// let BB = REF(EQ(COUNT(LT(CLOSE(), Ma60),AA)), 1);
// let CC = CROSS(CLOSE(), Ma60)
// log.info(yield TIME());
// let BB = REF(COUNT(yield CLOSE < yield Ma60, yield AA) = AA, 1);
// let CC = CROSS(CLOSE,Ma60) && VOLUME > yield MA(VOLUME,5) && (CLOSE-REF(CLOSE,1))/REF(CLOSE,1)*100 > 3;
// let FRCS: yield BB && yield CC;

// log.info(yield OR(GT(CLOSE(),OPEN()),GT(VOLUME(),REF(VOLUME(),1))));

