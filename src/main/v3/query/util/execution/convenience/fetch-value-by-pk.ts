import {TableWithPk, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {RawExprUtil} from "../../../../raw-expr";
import {SelectValueDelegate, AssertValidSelectValueDelegate, executeSelectValueDelegate} from "./select-value-delegate";
import {PrimaryKey} from "../../../../primary-key";

export function fetchValueByPk<
    TableT extends TableWithPk,
    DelegateT extends SelectValueDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>,
    delegate : AssertValidSelectValueDelegate<TableT, DelegateT>
) : (
    Promise<
        RawExprUtil.TypeOf<ReturnType<DelegateT>>
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select((columns, query) => {
            return executeSelectValueDelegate(
                columns,
                query,
                delegate as any
            );
        })
        .fetchValue(connection) as any;
}