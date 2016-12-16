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


// let MA20 = EMA(CLOSE, 20);
// let MA40 = EMA(CLOSE, 40);
// let MA60 = EMA(CLOSE, 60);
// let AA = BARSLAST(MA40.GT(MA60).AND(MA20.EQ(MA40).OR(MA20.GT(MA40))));
// log.info(COUNT(CLOSE.LT(MA60), AA).EQ(AA))
let r = EQ(
    COUNT(
        LT(
            CLOSE,EMA(CLOSE,60)
        ),
        BARSLAST(
            AND(
                GT(
                    EMA(CLOSE,40),
                    EMA(CLOSE,60)
                ),
                OR(
                    EQ(
                        EMA(CLOSE,20),
                        EMA(CLOSE,40)
                    ),
                    GT(
                        EMA(CLOSE,20),
                        EMA(CLOSE,40)
                    )
                )
            )
        )
    ),
    BARSLAST(
        AND(
            GT(
                EMA(CLOSE,40),
                EMA(CLOSE,60)
            ),
            OR(
                EQ(
                    EMA(CLOSE,20),
                    EMA(CLOSE,40)
                ),
                GT(
                    EMA(CLOSE,20),
                    EMA(CLOSE,40)
                )
            )
        )
    )
)

log.info(r,TIME)