import {TableWithPk, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {PrimaryKey} from "../../../../primary-key";

function fetchOneByPk_EntireRow<
    TableT extends TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(c => [c])
        .fetchOne(connection) as any;
}
function fetchOneByPk_Select<
    TableT extends TableWithPk,
    DelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>
    >
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>,
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>,
        DelegateT
    >
) : Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(delegate as any)
        .fetchOne(connection) as any;
}

export function fetchOneByPk<
    TableT extends TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : Promise<Row<TableT>>;
export function fetchOneByPk<
    TableT extends TableWithPk,
    DelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>
    >
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>,
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>,
        DelegateT
    >
) : Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>>;
export function fetchOneByPk (
    connection : IConnection,
    table : TableWithPk,
    pk : PrimaryKey<TableWithPk>,
    delegate? : (...args : any[]) => any
) {
    if (delegate == undefined) {
        return fetchOneByPk_EntireRow(connection, table, pk);
    } else {
        return fetchOneByPk_Select(connection, table, pk, delegate as any);
    }
}