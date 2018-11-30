import * as sd from "schema-decorator";
import {CandidateKey, CandidateKeyUtil} from "../candidate-key";
import {CandidateKeyTuple} from "./candidate-key-tuple";
import {ColumnMap} from "../column-map";
import {ExtractEqual} from "../type";

export namespace CandidateKeyTupleUtil {
    export type ToTypeMapUnion<
        CandidateKeyTupleT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        {
            [index in keyof CandidateKeyTupleT] : (
                CandidateKeyUtil.ToTypeMap<
                    Extract<CandidateKeyTupleT[index], CandidateKey>,
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
    /*
    declare const ckt : [
        {
            x : true,
            y : true,
        },
        {
            y : true,
            z : true,
        }
    ];
    declare const cm : {
        x : IColumn<{ tableAlias : "table", name : "x", assertDelegate : sd.AssertDelegate<string> }>,
        y : IColumn<{ tableAlias : "table", name : "y", assertDelegate : sd.AssertDelegate<number> }>,
        z : IColumn<{ tableAlias : "table", name : "z", assertDelegate : sd.AssertDelegate<boolean> }>
    }
    declare const uad : ToUnionAssertDelegate<typeof ckt, typeof cm>;
    //*/
    export type ToUnion<CandidateKeyTupleT extends CandidateKeyTuple> = (
        CandidateKeyTupleT[number]
    );

    /*
        For table inheritance support.

        When adding a parent table to a table,
        the two tables must have at least
        one unique key in common.

        TODO Find a better name?
    */
    export type CommonCandidateKeyUnion<
        TupleA extends CandidateKeyTuple,
        TupleB extends CandidateKeyTuple
    > = (
        ExtractEqual<
            ToUnion<TupleA>,
            ToUnion<TupleB>
        >
    );
    export function commonCandidateKeys<
        TupleA extends CandidateKeyTuple,
        TupleB extends CandidateKeyTuple
    > (
        tupleA : TupleA,
        tupleB : TupleB
    ) : (
        CommonCandidateKeyUnion<
            TupleA,
            TupleB
        >[]
    ) {
        const result : CandidateKey[] = [];
        for (let a of tupleA) {
            for (let b of tupleB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result as any;
    }
}
