import {TableWithPk, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {PrimaryKey} from "../../../../primary-key";

function fetchZeroOrOneByPk_EntireRow<
    TableT extends TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : Promise<Row<TableT>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}
function fetchZeroOrOneByPk_Select<
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
) : Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .__unsafeWhere(() => TableUtil.eqPrimaryKey(table, pk) as any)
        .select(delegate as any)
        .fetchZeroOrOne(connection) as any;
}

export function fetchZeroOrOneByPk<
    TableT extends TableWithPk
> (
    connection : IConnection,
    table : TableT,
    pk : PrimaryKey<TableT>
) : Promise<Row<TableT>|undefined>;
export function fetchZeroOrOneByPk<
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
) : Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>|undefined>;
export function fetchZeroOrOneByPk (
    connection : IConnection,
    table : TableWithPk,
    pk : PrimaryKey<TableWithPk>,
    delegate? : (...args : any[]) => any
) {
    if (delegate == undefined) {
        return fetchZeroOrOneByPk_EntireRow(connection, table, pk);
    } else {
        return fetchZeroOrOneByPk_Select(connection, table, pk, delegate as any);
    }
}