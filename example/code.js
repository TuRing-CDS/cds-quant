// /**
//  * Created by Z on 2016-12-13.
//  */
// // MACD
// let SHORT = 12;
// let LONG = 26;
// let M = 9;
// let DIFF = SUB(EMA(CLOSE, SHORT), EMA(CLOSE, LONG));
// let DEA = EMA(DIFF, M);
// let MACD = MUL(2, SUB(DIFF, DEA));
// // log.info(DIFF, DEA, MACD);
// draw.line('DIFF', DIFF, {color: '#ff00ff', screen: 'sc1'});
// draw.stick('MACD', MACD, {bear: {color: 'green'}, bull: {color: 'red'}, screen: 'sc1'});
// draw.line('DEA', DEA, {color: '#00ffff', screen: 'sc1'});
//
//
// // KDJ
//
// let N = 9;
// let M1 = 3;
// let M2 = 3;
// let RSV = CLOSE.SUB(LLV(LOW, N)).DIV(HHV(HIGH, N).SUB(LLV(LOW, N))).MUL(100);
// let K = SMA(RSV, M1, 1);
// let D = SMA(K, M2, 1);
// let J = MUL(K, 3).SUB(MUL(D, 2));
// draw.line('K', K, {color: '#ff00ff', screen: 'sc2'});
// draw.line('D', D, {color: '#ff66ff', screen: 'sc2'});
// draw.line('J', J, {color: '#ff99ff', screen: 'sc2'});
// // score.choose(K);
// //
//
// // log.info(CCI)
//
// // RSI
// //
// // REFLINE: 0, 20, 50, 80, 100;
// // LC := REF(CLOSE,1);
// // RSI1:SMA(MAX(CLOSE-LC,0),N1,1)/SMA(ABS(CLOSE-LC),N1,1)*100;
// // RSI2:SMA(MAX(CLOSE-LC,0),N2,1)/SMA(ABS(CLOSE-LC),N2,1)*100;
// // RSI3:SMA(MAX(CLOSE-LC,0),N3,1)/SMA(ABS(CLOSE-LC),N3,1)*100;
//
// // let RSIN1 = 6;
// // let RSIN2 = 12;
// // let RSIN3 = 24;
// // let LC = REF(CLOSE, 1);
// // let RSI1 = SMA(MAX(CLOSE.SUB(LC), 0), RSIN1, 1).DIV(SMA(ABS(CLOSE.SUB(LC)), RSIN1, 1)).MUL(100);
// // let RSI2 = SMA(MAX(CLOSE.SUB(LC), 0), RSIN2, 1).DIV(SMA(ABS(CLOSE.SUB(LC)), RSIN2, 1)).MUL(100);
// // let RSI3 = SMA(MAX(CLOSE.SUB(LC), 0), RSIN3, 1).DIV(SMA(ABS(CLOSE.SUB(LC)), RSIN3, 1)).MUL(100);
// // log.info(RSI1,RSI2,RSI3)
//
// //DMI
//
// // TR := SUM(MAX(MAX(HIGH-LOW,ABS(HIGH-REF(CLOSE,1))),ABS(LOW-REF(CLOSE,1))),N);
// // HD := HIGH-REF(HIGH,1);
// // LD := REF(LOW,1)-LOW;
// // DMP:= SUM(IF(HD>0 AND HD>LD,HD,0),N);
// // DMM:= SUM(IF(LD>0 AND LD>HD,LD,0),N);
// // PDI: DMP*100/TR;
// // MDI: DMM*100/TR;
// // ADX: MA(ABS(MDI-PDI)/(MDI+PDI)*100,M);
// // ADXR:(ADX+REF(ADX,M))/2;
//
// // log.info(K,D,J);
// // let N = 14;
// // let M = 6;
// //
// // let TR = SUM(MAX(MAX(HIGH.SUB(LOW), ABS(HIGH.SUB(REF(CLOSE, 1)))), ABS(LOW.SUB(REF(CLOSE, 1)))), N);
// // let HD = HIGH.SUB(REF(HIGH, 1));
// // let LD = REF(LOW, 1).SUB(LOW);
// // let DMP = SUM(IF(HD.GT(0).AND(HD.GT(LD)), HD, 0), N);
// // let DMM = SUM(IF(LD.GT(0).AND(LD.GT(HD)), LD, 0), N);
// // let PDI = DMP.MUL(100).DIV(TR);
// // let MDI = DMM.MUL(100).DIV(TR);
// // let ADX = MA(ABS(MDI.SUB(PDI)).DIV(MDI.ADD(PDI)).MUL(100), M);
// // let ADXR = ADX.ADD(REF(ADX, M)).DIV(2);
// // log.info(PDI, MDI, ADX, ADXR);
//
// // CCI
// let N2 = 14;
// let TYP = DIV(ADD(HIGH, ADD(LOW, CLOSE)), 3);
// let CCI = DIV(SUB(TYP, MA(TYP, N2)), MUL(0.015, AVERAGE(TYP, N2)));
// draw.line('CCI', CCI, {color: '#ff0000', screen: 'sc3'});

// log.info(BARSLAST(CLOSE.GT(OPEN), 5));
// log.info(IF(CLOSE.GT(OPEN),"涨","跌"),OPEN,CLOSE);
log.info(MEMA(CLOSE,5));