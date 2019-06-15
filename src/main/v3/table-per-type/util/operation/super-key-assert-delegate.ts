import * as sd from "type-mapping";
import {ITable} from "../../../table";
import {Key} from "../../../key";
import {ColumnNames, ColumnType, uniqueColumnNames, getColumnsWithName} from "../query";
import {CandidateKeyImpl} from "../../../candidate-key";

export type SuperKeyUnionFromCandidateKey<
    CandidateKeyT extends Key,
    TableT extends ITable
> = (
    CandidateKeyT extends Key ?
    (
        CandidateKeyImpl<TableT["columns"], CandidateKeyT> &
        {
            [columnName in Exclude<
                ColumnNames<TableT>,
                CandidateKeyT[number]
            >]? : (
                ColumnType<TableT, columnName>
            )
        }
    ) :
    never
);
function assertDelegateFromCandidateKey<
    CandidateKeyT extends Key,
    TableT extends ITable
> (candidateKey : CandidateKeyT, table : TableT) : (
    sd.SafeMapper<SuperKeyUnionFromCandidateKey<CandidateKeyT, TableT>>
) {
    const assertMap : any = {};
    for (let columnName of uniqueColumnNames(table)) {
        const columns = getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        if (candidateKey.indexOf(columnName) >= 0) {
            assertMap[columnName] = sd.unsafeDeepMerge(
                ...columns.map(c => c.assertDelegate)
            );
        } else {
            assertMap[columnName] = sd.optional(sd.unsafeDeepMerge(
                ...columns.map(c => c.assertDelegate)
            ));
        }
    }
    return sd.objectFromMap(assertMap) as any;
}
export type SuperKeyUnionFromCandidateKeyArray<
    CandidateKeyArrayT extends Key[],
    TableT extends ITable
> = (
    SuperKeyUnionFromCandidateKey<
        CandidateKeyArrayT[number],
        TableT
    >
);
function assertDelegateFromCandidateKeyArray<
    CandidateKeyArrayT extends Key[],
    TableT extends ITable
> (candidateKeyArr : CandidateKeyArrayT, table : TableT) : (
    sd.SafeMapper<SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, TableT>>
) {
    const arr = candidateKeyArr.map(
        candidateKey => assertDelegateFromCandidateKey(
            candidateKey,
            table
        )
    );
    return sd.unsafeOr(
        ...arr
    ) as any;
}
export type SuperKey<TableT extends ITable> = (
    SuperKeyUnionFromCandidateKeyArray<
        TableT["candidateKeys"],
        TableT
    >
);
export type SuperKeyAssertDelegate<TableT extends ITable> = (
    sd.SafeMapper<SuperKey<TableT>>
);
export function superKeyAssertDelegate<TableT extends ITable> (
    table : TableT
) : (
    SuperKeyAssertDelegate<TableT>
) {
    return assertDelegateFromCandidateKeyArray(
        //https://github.com/Microsoft/TypeScript/issues/28592
        table.candidateKeys as TableT["candidateKeys"],
        table
    );
}