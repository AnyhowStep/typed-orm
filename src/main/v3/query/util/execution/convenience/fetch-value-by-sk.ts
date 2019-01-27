import {ITable, TableUtil} from "../../../../table";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {RawExprUtil} from "../../../../raw-expr";
import {SelectValueDelegate, AssertValidSelectValueDelegate, executeSelectValueDelegate} from "./select-value-delegate";
import {SuperKey} from "../../../../super-key";

export function fetchValueBySk<
    TableT extends ITable,
    DelegateT extends SelectValueDelegate<TableT>
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>,
    delegate : AssertValidSelectValueDelegate<TableT, DelegateT>
) : (
    Promise<
        RawExprUtil.TypeOf<ReturnType<DelegateT>>
    >
) {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqSuperKey(table, sk) as any)
        .select((columns, query) => {
            return executeSelectValueDelegate(
                columns,
                query,
                delegate as any
            );
        })
        .fetchValue(connection) as any;
}