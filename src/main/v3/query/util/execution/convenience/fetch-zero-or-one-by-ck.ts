import {ITable, TableUtil} from "../../../../table";
import {TypeMapUtil} from "../../../../type-map";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import * as exprLib from "../../../../expr-library";

export function fetchZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>
) : Promise<TypeMapUtil.FromTable<TableT>> {
    ck = TableUtil.candidateKeyAssertDelegate(table)(
        `${table.alias}.ck`,
        ck
    );

    const arr = Object.keys(ck).map(
        columnName => exprLib.nullSafeEq(
            table.columns[columnName],
            (ck as any)[columnName]
        )
    );
    const condition = exprLib.and(...(arr as any));
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => condition)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}