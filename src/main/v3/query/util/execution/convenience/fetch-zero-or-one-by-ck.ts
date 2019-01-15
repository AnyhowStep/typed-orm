import {ITable, TableUtil} from "../../../../table";
import {Row} from "../../../../row";
import {QueryUtil} from "../../..";
import {IConnection} from "../../../../execution";
import {CandidateKey} from "../../../../candidate-key";

function fetchZeroOrOneByCk_EntireRow<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>
) : Promise<Row<TableT>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(c => [c])
        .fetchZeroOrOne(connection) as any;
}
function fetchZeroOrOneByCk_Select<
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
) : Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>|undefined> {
    return QueryUtil.newInstance()
        .from(table as any)
        .where(() => TableUtil.eqCandidateKey(table, ck) as any)
        .select(delegate as any)
        .fetchZeroOrOne(connection) as any;
}

export function fetchZeroOrOneByCk<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    ck : CandidateKey<TableT>
) : Promise<Row<TableT>|undefined>;
export function fetchZeroOrOneByCk<
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
) : Promise<QueryUtil.UnmappedType<ReturnType<DelegateT>>|undefined>;
export function fetchZeroOrOneByCk (
    connection : IConnection,
    table : ITable,
    ck : CandidateKey<ITable>,
    delegate? : (...args : any[]) => any
) {
    if (delegate == undefined) {
        return fetchZeroOrOneByCk_EntireRow(connection, table, ck);
    } else {
        return fetchZeroOrOneByCk_Select(connection, table, ck, delegate as any);
    }
}