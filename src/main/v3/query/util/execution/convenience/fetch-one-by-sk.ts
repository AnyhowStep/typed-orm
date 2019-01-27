import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {SuperKey} from "../../../../super-key";

function fetchOneBySk_EntireRow<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(c => [c])
        .fetchOne(connection) as any;
}
function fetchOneBySk_Select<
    TableT extends ITable,
    DelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>
    >
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>,
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>,
        DelegateT
    >
) : Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(delegate as any)
        .fetchOne(connection) as any;
}

export function fetchOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : Promise<Row<TableT>>;
export function fetchOneBySk<
    TableT extends ITable,
    DelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>
    >
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>,
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>,
        DelegateT
    >
) : Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>>;
export function fetchOneBySk (
    connection : IConnection,
    table : ITable,
    sk : SuperKey<ITable>,
    delegate? : (...args : any[]) => any
) {
    if (delegate == undefined) {
        return fetchOneBySk_EntireRow(connection, table, sk);
    } else {
        return fetchOneBySk_Select(connection, table, sk, delegate as any);
    }
}