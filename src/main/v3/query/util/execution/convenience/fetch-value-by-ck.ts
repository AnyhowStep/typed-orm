import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {RawExprUtil} from "../../../../raw-expr";
import {SelectValueDelegate, AssertValidSelectValueDelegate, executeSelectValueDelegate} from "./select-value-delegate";
import {CandidateKey} from "../../../../candidate-key";

export function fetchValueByCk<
    TableT extends ITable,
    DelegateT extends SelectValueDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>,
    delegate : AssertValidSelectValueDelegate<TableT, DelegateT>
) : (
    Promise<
        RawExprUtil.TypeOf<ReturnType<DelegateT>>
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select((columns, query) => {
            return executeSelectValueDelegate(
                columns,
                query,
                delegate as any
            );
        })
        .fetchValue(connection) as any;
}