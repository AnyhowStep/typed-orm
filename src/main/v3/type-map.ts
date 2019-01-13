import * as sd from "schema-decorator";
import {Key} from "./key";
import {ColumnMap} from "./column-map";

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
    export type UnionFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > = (
        CandidateKeyT extends Key ?
        {
            readonly [columnName in Extract<
                keyof ColumnMapT,
                CandidateKeyT[number]
            >] : (
                ReturnType<ColumnMapT[columnName]["assertDelegate"]>
            )
        } :
        never
    );
    export type UnionFromCandidateKeyArray<
        CandidateKeyArrayT extends Key[],
        ColumnMapT extends ColumnMap
    > = (
        UnionFromCandidateKey<
            CandidateKeyArrayT[number],
            ColumnMapT
        >
    );

    export type AssertDelegateFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<
            TypeMapUtil.UnionFromCandidateKey<
                CandidateKeyT,
                ColumnMapT
            >
        >
    );
    export function assertDelegateFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > (
        candidateKey : CandidateKeyT,
        columnMap : ColumnMapT
    ) : (
        AssertDelegateFromCandidateKey<CandidateKeyT, ColumnMapT>
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
            }
        }
        return sd.schema(...fields) as any;
    }

    export type AssertDelegateFromCandidateKeyArray<
        CandidateKeyTupleT extends Key[],
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<
            UnionFromCandidateKeyArray<
                CandidateKeyTupleT,
                ColumnMapT
            >
        >
    );
    export function assertDelegateFromCandidateKeyArray<
        CandidateKeyTupleT extends Key[],
        ColumnMapT extends ColumnMap
    > (
        candidateKeyTuple : CandidateKeyTupleT,
        columnMap : ColumnMapT
    ) : (
        AssertDelegateFromCandidateKeyArray<CandidateKeyTupleT, ColumnMapT>
    ) {
        return sd.or(
            ...candidateKeyTuple
                .map(candidateKey => assertDelegateFromCandidateKey(
                    candidateKey,
                    columnMap
                ))
        ) as any;
    }

    export type SuperKeyUnionFromCandidateKey<
        CandidateKeyT extends Key,
        ColumnMapT extends ColumnMap
    > = (
        CandidateKeyT extends Key ?
        (
            UnionFromCandidateKey<CandidateKeyT, ColumnMapT> &
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