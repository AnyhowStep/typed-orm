import * as sd from "schema-decorator";
import {ITable} from "../../../table";
import {TypeMapUtil} from "../../../type-map";
import { CandidateKey } from "../../../candidate-key";
import { ColumnNames, ColumnType, uniqueColumnNames, getColumnsWithName } from "../query";

export type SuperKeyUnionFromCandidateKey<
    CandidateKeyT extends CandidateKey,
    TableT extends ITable
> = (
    CandidateKeyT extends CandidateKey ?
    (
        TypeMapUtil.UnionFromCandidateKey<CandidateKeyT, TableT["columns"]> &
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
    CandidateKeyT extends CandidateKey,
    TableT extends ITable
> (candidateKey : CandidateKeyT, table : TableT) : (
    sd.AssertDelegate<SuperKeyUnionFromCandidateKey<CandidateKeyT, TableT>>
) {
    const assertMap : any = {};
    for (let columnName of uniqueColumnNames(table)) {
        const columns = getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        if (candidateKey.indexOf(columnName) >= 0) {
            assertMap[columnName] = sd.and(
                ...columns.map(c => c.assertDelegate)
            );
        } else {
            assertMap[columnName] = sd.optional(sd.and(
                ...columns.map(c => c.assertDelegate)
            ));
        }
    }
    return sd.toSchema(assertMap) as any;
}
export type SuperKeyUnionFromCandidateKeyArray<
    CandidateKeyArrayT extends CandidateKey[],
    TableT extends ITable
> = (
    SuperKeyUnionFromCandidateKey<
        CandidateKeyArrayT[number],
        TableT
    >
);
function assertDelegateFromCandidateKeyArray<
    CandidateKeyArrayT extends CandidateKey[],
    TableT extends ITable
> (candidateKeyArr : CandidateKeyArrayT, table : TableT) : (
    sd.AssertDelegate<SuperKeyUnionFromCandidateKeyArray<CandidateKeyArrayT, TableT>>
) {
    const arr = candidateKeyArr.map(
        candidateKey => assertDelegateFromCandidateKey(
            candidateKey,
            table
        )
    );
    return sd.or(
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
    sd.AssertDelegate<SuperKey<TableT>>
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