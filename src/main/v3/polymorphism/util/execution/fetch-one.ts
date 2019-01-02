import {ITable} from "../../../table";
import {TypeMap} from "../query";
import {IConnection} from "../../../execution";
import {IAnonymousTypedExpr} from "../../../expr";
import {QueryUtil} from "../../../query";
import {from} from "./from";

export type FetchOneResult<TableT extends ITable> = (
    TypeMap<TableT>
);
export async function fetchOne<
    TableT extends ITable
> (
    connection : IConnection,
    table : TableT,
    where : IAnonymousTypedExpr<boolean>
) : Promise<TypeMap<TableT>> {
    if (table.parents.length == 0) {
        return QueryUtil.fetchOne(
            QueryUtil.newInstance()
                .from(table as any)
                .where(() => where)
                .select(c => [c]),
            connection
        ) as any;
    }
    const rawResult : any = await QueryUtil.fetchOne(
        QueryUtil.select(
            QueryUtil.where(
                from(table),
                () => where
            ),
            ((c : any) => [c]) as any
        ),
        connection
    );
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