import {ITable} from "../../../table";
import {TypeMap} from "../query";
import {IConnection} from "../../../execution";
import {IAnonymousTypedExpr} from "../../../expr";
import {QueryUtil} from "../../../query";
import {from} from "./from";

export type FetchZeroOrOneResult<TableT extends ITable> = (
    TypeMap<TableT>|undefined
);
export async function fetchZeroOrOne<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : Promise<FetchZeroOrOneResult<TableT>> {
    if (table.parents.length == 0) {
        return QueryUtil.fetchZeroOrOne(
            QueryUtil.newInstance()
                .from(table as any)
                .where(() => where)
                .select(c => [c]),
            connection
        ) as any;
    }
    const rawResult : any = await QueryUtil.fetchZeroOrOne(
        QueryUtil.select(
            QueryUtil.where(
                from(table),
                (() => where) as any
            ),
            ((c : any) => [c]) as any
        ),
        connection
    );
    if (rawResult == undefined) {
        return undefined;
    }
    const result : any = {};
    const alreadyCopied = new Set<string>();
    for (let p of table.parents) {
        if (alreadyCopied.has(p.alias)) {
            continue;
        }
        alreadyCopied.add(p.alias);
        for (let columnName in p.columns) {
            result[columnName] = rawResult[p.alias][columnName];
        }
    }
    for (let columnName in table.columns) {
        result[columnName] = rawResult[table.alias][columnName];
    }
    return result;
}