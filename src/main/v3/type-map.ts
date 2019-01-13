import * as sd from "schema-decorator";
import {Key} from "./key";
import {ColumnMap} from "./column-map";
import {CandidateKeyImpl} from "./candidate-key";

export namespace TypeMapUtil {
    export type FromColumnMap<MapT extends ColumnMap> = (
        MapT extends ColumnMap ?
        {
            readonly [columnName in Extract<keyof MapT, string>] : (
                ReturnType<MapT[columnName]["assertDelegate"]>
            )
        } :
        never
    );
    export type SuperKeyUnionFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > = (
        CandidateKeyT extends Key ?
        (
            CandidateKeyImpl<ColumnMapT, CandidateKeyT> &
            {
                [columnName in Exclude<
                    keyof ColumnMapT,
                    CandidateKeyT[number]
                >]? : (
                    ReturnType<ColumnMapT[columnName]["assertDelegate"]>
                )
            }
        ) :
        never
    );
    export type SuperKeyAssertDelegateFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<
            SuperKeyUnionFromCandidateKey<
                CandidateKeyT,
                ColumnMapT
            >
        >
    );
    export function superKeyAssertDelegateFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > (
        candidateKey : CandidateKeyT,
        columnMap : ColumnMapT
    ) : (
        SuperKeyAssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>
    ) {
        const fields : sd.Field<any, any>[] = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumnUtil.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (candidateKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(
                    column.name,
                    column.assertDelegate
                ));
            } else {
                fields.push(sd.field(
                    column.name,
                    sd.optional(column.assertDelegate)
                ));
            }
        }
        return sd.schema(...fields) as any;
    }

    export type SuperKeyUnionFromCandidateKeyArray<
        CandidateKeyArrayT extends Key[],
        ColumnMapT extends ColumnMap
    > = (
        SuperKeyUnionFromCandidateKey<
            CandidateKeyArrayT[number],
            ColumnMapT
        >
    );
    export type SuperKeyAssertDelegateFromCandidateKeyArray<
        CandidateKeyArrayT extends Key[],
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<
            SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>
        >
    );
    export function superKeyAssertDelegateFromCandidateKeyArray<
        CandidateKeyArrayT extends Key[],
        ColumnMapT extends ColumnMap
    > (
        candidateKeyTuple : CandidateKeyArrayT,
        columnMap : ColumnMapT
    ) : (
        SuperKeyAssertDelegateFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>
    ) {
        return sd.or(
            ...candidateKeyTuple
                .map(candidateKey => superKeyAssertDelegateFromCandidateKey(
                    candidateKey,
                    columnMap
                ))
        ) as any;
    }
}