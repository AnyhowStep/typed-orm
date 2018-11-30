import * as sd from "schema-decorator";
import {CandidateKey} from "./candidate-key";
import {ColumnMap} from "./column-map";
import {SuperKeyUtil} from "./super-key";

export namespace SuperKeyArrayUtil {
    export type ToTypeMapUnion<
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        {
            [index in keyof CandidateKeyArrayT] : (
                SuperKeyUtil.ToTypeMap<
                    Extract<CandidateKeyArrayT[index], CandidateKey>,
                    ColumnMapT
                >
            )
        }[number]
    );
    //TODO Debate ToUnionAssertDelegate vs ToAssertDelegateUnion
    export type ToUnionAssertDelegate<
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<ToTypeMapUnion<CandidateKeyArrayT, ColumnMapT>>
    );
    export function toUnionAssertDelegate<
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > (
        candidateKeyTuple : CandidateKeyArrayT,
        columnMap : ColumnMapT
    ) : (
        ToUnionAssertDelegate<CandidateKeyArrayT, ColumnMapT>
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