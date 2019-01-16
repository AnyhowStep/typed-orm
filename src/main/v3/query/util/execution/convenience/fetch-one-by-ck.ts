import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

function fetchOneByCk_EntireRow<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>
) : Promise<Row<TableT>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(c => [c])
        .fetchOne(connection) as any;
}
function fetchOneByCk_Select<
    TableT extends ITable,
    DelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>
    >
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>,
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>,
        DelegateT
    >
) : Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(delegate as any)
        .fetchOne(connection) as any;
}
export function fetchOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>
) : Promise<Row<TableT>>;
export function fetchOneByCk<
    TableT extends ITable,
    DelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>
    >
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>,
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.From<QueryUtil.NewInstance, TableT>,
        DelegateT
    >
) : Promise<QueryUtil.UnmappedTypeNoJoins<ReturnType<DelegateT>>>;
export function fetchOneByCk (
    connection : IConnection,
    table : ITable,
    ck : CandidateKey<ITable>,
    delegate? : (...args : any[]) => any
) {
    if (delegate == undefined) {
        return fetchOneByCk_EntireRow(connection, table, ck);
    } else {
        return fetchOneByCk_Select(connection, table, ck, delegate as any);
    }
}