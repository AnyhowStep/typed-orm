import * as sd from "schema-decorator";
import {CandidateKey} from "./candidate-key";
import {ColumnMap} from "./column-map";
import {SuperKeyUtil} from "./super-key";

export namespace SuperKeyTupleUtil {
    export type ToTypeMapUnion<
        CandidateKeyTupleT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        {
            [index in keyof CandidateKeyTupleT] : (
                SuperKeyUtil.ToTypeMap<
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
                .map(candidateKey => SuperKeyUtil.toAssertDelegate(
                    candidateKey,
                    columnMap
                ))
        ) as any;
    }
}