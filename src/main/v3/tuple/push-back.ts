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
            `TupleT extends [${generate(count, i => `infer T${i}`)}] ?`,
            count == 0 ?
            `[NextT] :` :
            `[${generate(count, i => `T${i}`)}, NextT] :`
        ].join("\n    ");
    }
    function generateCases (count) {
        return generate(count, i => generateCase(i), "\n    ")
    }
    generateCases(50)
*/
export type PushBack<TupleT extends any[], NextT> = (
    TupleT extends [] ?
    [NextT] :
    TupleT extends [infer T0] ?
    [T0, NextT] :
    TupleT extends [infer T0, infer T1] ?
    [T0, T1, NextT] :
    TupleT extends [infer T0, infer T1, infer T2] ?
    [T0, T1, T2, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3] ?
    [T0, T1, T2, T3, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4] ?
    [T0, T1, T2, T3, T4, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5] ?
    [T0, T1, T2, T3, T4, T5, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6] ?
    [T0, T1, T2, T3, T4, T5, T6, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, NextT] :
    TupleT extends [infer T0, infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, infer T10, infer T11, infer T12, infer T13, infer T14, infer T15, infer T16, infer T17, infer T18, infer T19, infer T20, infer T21, infer T22, infer T23, infer T24, infer T25] ?
    [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, NextT] :
    never
);
export function pushBack<TupleT extends any[], NextT> (
    tuple : TupleT,
    next : NextT
) : (
    PushBack<TupleT, NextT>
) {
    return tuple.concat([next]) as any;
}