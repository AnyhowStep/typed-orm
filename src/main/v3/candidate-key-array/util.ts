import * as sd from "schema-decorator";
import {CandidateKey, CandidateKeyUtil} from "../candidate-key";
import {ColumnMap} from "../column-map";
import {ExtractEqual} from "../type";

export namespace CandidateKeyArrayUtil {
    export type ToTypeMapUnion<
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        {
            [index in keyof CandidateKeyArrayT] : (
                CandidateKeyUtil.ToTypeMap<
                    Extract<CandidateKeyArrayT[index], CandidateKey>,
                    ColumnMapT
                >
            )
        }[number]
    );
    //TODO Debate ToUnionAssertDelegate vs ToAssertDelegateUnion
    export type ToUnionAssertDelegate<
        CandidateKeyTupleT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<ToTypeMapUnion<CandidateKeyTupleT, ColumnMapT>>
    );
    export function toUnionAssertDelegate<
        CandidateKeyTupleT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > (
        candidateKeyTuple : CandidateKeyTupleT,
        columnMap : ColumnMapT
    ) : (
        ToUnionAssertDelegate<CandidateKeyTupleT, ColumnMapT>
    ) {
        return sd.or(
            ...candidateKeyTuple
                .map(candidateKey => CandidateKeyUtil.toAssertDelegate(
                    candidateKey,
                    columnMap
                ))
        ) as any;
    }
    export type ToUnion<CandidateKeyArrayT extends CandidateKey[]> = (
        CandidateKeyArrayT[number]
    );

    /*
        For table inheritance support.

        When adding a parent table to a table,
        the two tables must have at least
        one unique key in common.

        TODO Find a better name?
    */
    export type CommonCandidateKeyUnion<
        ArrayA extends CandidateKey[],
        ArrayB extends CandidateKey[]
    > = (
        ExtractEqual<
            ToUnion<ArrayA>,
            ToUnion<ArrayB>
        >
    );
    export function hasCommonCandidateKeys (
        arrayA : CandidateKey[],
        arrayB : CandidateKey[]
    ) : boolean {
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    return true;
                }
            }
        }
        return false;
    }
    export function commonCandidateKeys<
        ArrayA extends CandidateKey[],
        ArrayB extends CandidateKey[]
    > (
        arrayA : ArrayA,
        arrayB : ArrayB
    ) : (
        CommonCandidateKeyUnion<
            ArrayA,
            ArrayB
        >[]
    ) {
        const result : CandidateKey[] = [];
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result as any;
    }
}

/*
import {IColumn} from "../column";
declare const ckt : [
    ("x"|"y")[],
    ("y"|"z")[]
];
declare const cm : {
    x : IColumn<{ tableAlias : "table", name : "x", assertDelegate : sd.AssertDelegate<string> }>,
    y : IColumn<{ tableAlias : "table", name : "y", assertDelegate : sd.AssertDelegate<number> }>,
    z : IColumn<{ tableAlias : "table", name : "z", assertDelegate : sd.AssertDelegate<boolean> }>
}
declare const uad : CandidateKeyArrayUtil.ToUnionAssertDelegate<typeof ckt, typeof cm>;
//*/