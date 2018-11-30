/*
    function generate (count, callback, separator) {
        if (separator == undefined) {
            separator = ", ";
        }
        const parts = [];
        for (let i=0; i<count; ++i) {
            parts.push(callback(i));
        }
        return parts.join(separator);
    }
    function generateCase (count) {
        return [
			count == 0 ?
            `TupleT extends [unknown] ?` :
            `TupleT extends [unknown, ${generate(count, i => `infer T${i}`)}] ?`,
            count == 0 ?
            `[] :` :
            `[${generate(count, i => `T${i}`)}] :`
        ].join("\n    ");
    }
    function generateCases (count) {
        return generate(count, i => generateCase(i), "\n    ")
    }
    generateCases(3)
*/
export type PopFront<TupleT extends any[]> = (
    TupleT extends [unknown] ?
    [] :
    TupleT extends [unknown, infer T0] ?
    [T0] :
    TupleT extends [unknown, infer T0, infer T1] ?
    [T0, T1] :
    TupleT extends [unknown, infer T0, infer T1, infer T2] ?
    [T0, T1, T2] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3] ?
    [T0, T1, T2, T3] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4] ?
    [T0, T1, T2, T3, T4] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5] ?
    [T0, T1, T2, T3, T4, T5] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6] ?
    [T0, T1, T2, T3, T4, T5, T6] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7] ?
    [T0, T1, T2, T3, T4, T5, T6, T7] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42, infer T43] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42, infer T43, infer T44] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42, infer T43, infer T44, infer T45] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44, T45] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42, infer T43, infer T44, infer T45, infer T46] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44, T45, T46] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42, infer T43, infer T44, infer T45, infer T46, infer T47] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44, T45, T46, T47] :
    TupleT extends [unknown, infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25, infer T26, infer T27, infer T28, infer T29, infer T30, infer T31, infer T32, infer T33, infer T34, infer T35, infer T36, infer T37, infer T38, infer T39, infer T40, infer T41, infer T42, infer T43, infer T44, infer T45, infer T46, infer T47, infer T48] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, T26, T27, T28, T29, T30, T31, T32, T33, T34, T35, T36, T37, T38, T39, T40, T41, T42, T43, T44, T45, T46, T47, T48] :
    never
);
export function popFront<TupleT extends any[]> (
    tuple : TupleT
) : (
    [TupleT[0], PopFront<TupleT>]
) {
    return [
        tuple[0],
        tuple.slice(1) as any
    ];
}