import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {SuperKey} from "../../../../super-key";

function fetchZeroOrOneBySk_EntireRow<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : Promise<Row<TableT>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}
function fetchZeroOrOneBySk_Select<
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
) : Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqSuperKey(table, sk) as any)
        .select(delegate as any)
        .fetchZeroOrOne(connection) as any;
}

export function fetchZeroOrOneBySk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    sk : SuperKey<TableT>
) : Promise<Row<TableT>|undefined>;
export function fetchZeroOrOneBySk<
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
) : Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>|undefined>;
export function fetchZeroOrOneBySk (
    connection : IConnection,
    table : ITable,
    sk : SuperKey<ITable>,
    delegate? : (...args : any[]) => any
) {
    if (delegate == undefined) {
        return fetchZeroOrOneBySk_EntireRow(connection, table, sk);
    } else {
        return fetchZeroOrOneBySk_Select(connection, table, sk, delegate as any);
    }
}