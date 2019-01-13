import * as sd from "schema-decorator";
import {CandidateKey} from "./candidate-key";
import {ColumnMap} from "./column-map";
import { ITable } from "./table";

export namespace TypeMapUtil {
    export type UnionFromCandidateKey<
        CandidateKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        CandidateKeyT extends CandidateKey ?
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
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        UnionFromCandidateKey<
            CandidateKeyArrayT[number],
            ColumnMapT
        >
    );

    export type AssertDelegateFromCandidateKey<
        CandidateKeyT extends CandidateKey,
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
        CandidateKeyT extends CandidateKey,
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
        CandidateKeyTupleT extends CandidateKey[],
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
        CandidateKeyTupleT extends CandidateKey[],
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
        CandidateKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        CandidateKeyT extends CandidateKey ?
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
        CandidateKeyT extends CandidateKey,
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
        CandidateKeyT extends CandidateKey,
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
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        SuperKeyUnionFromCandidateKey<
            CandidateKeyArrayT[number],
            ColumnMapT
        >
    );
    export type SuperKeyAssertDelegateFromCandidateKeyArray<
        CandidateKeyArrayT extends CandidateKey[],
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<
            SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, ColumnMapT>
        >
    );
    export function superKeyAssertDelegateFromCandidateKeyArray<
        CandidateKeyArrayT extends CandidateKey[],
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

    export type FromPrimaryKey<
        PrimaryKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        PrimaryKeyT extends CandidateKey ?
        {
            readonly [columnName in Extract<
                keyof ColumnMapT,
                PrimaryKeyT[number]
            >] : (
                ReturnType<ColumnMapT[columnName]["assertDelegate"]>
            )
        } :
        never
    );
    export type AssertDelegateFromPrimaryKey<
        PrimaryKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > = (
        sd.AssertDelegate<
            FromPrimaryKey<PrimaryKeyT, ColumnMapT>
        >
    );
    export function assertDelegateFromPrimaryKey<
        PrimaryKeyT extends CandidateKey,
        ColumnMapT extends ColumnMap
    > (
        primaryKey : PrimaryKeyT,
        columnMap : ColumnMapT
    ) : (
        AssertDelegateFromPrimaryKey<PrimaryKeyT, ColumnMapT>
    ) {
        const fields : sd.Field<any, any>[] = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumnUtil.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (primaryKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(
                    column.name,
                    column.assertDelegate
                ));
            }
        }
        return sd.schema(...fields) as any;
    }
}