import {ITable} from "../../../table";
import {IColumn} from "../../../column";
import {QueryUtil, Query} from "../../../query";
import {CandidateKey} from "../../../candidate-key";
import {IJoin} from "../../../join";

function tryGetColumn (
    query : QueryUtil.AfterFromClause,
    columnName : string
) : IColumn|undefined {
    //Looping backwards gives us a more "natural" looking
    //join in most cases
    for (let i=query._joins.length-1; i>=0; --i) {
        const join = query._joins[i];
        if (columnName in join.columns) {
            return join.columns[columnName];
        }
    }
    return undefined;
}
function tryGetColumnArray (
    query : QueryUtil.AfterFromClause,
    ck : CandidateKey
) : IColumn[]|undefined {
    const result : IColumn[] = [];
    for (let columnName of ck) {
        const column = tryGetColumn(query, columnName);
        if (column == undefined) {
            return undefined;
        }
        result.push(column);
    }
    return result;
}

function tryGetJoinCkUsingColumnArray (
    query : QueryUtil.AfterFromClause,
    parent : ITable
) : IColumn[]|undefined {
    for (let candidateKey of parent.candidateKeys) {
        const columns = tryGetColumnArray(query, candidateKey);
        if (columns != undefined) {
            return columns;
        }
    }
    return undefined;
}

export type ToJoin<TableT extends ITable> = (
    TableT extends ITable ?
    IJoin<{
        readonly aliasedTable : TableT,
        readonly columns : TableT["columns"],
        readonly nullable : false,
    }> :
    never
);
export type From<
    TableT extends ITable
> = (
    Query<{
        readonly _distinct : false;
        readonly _sqlCalcFoundRows : false;

        readonly _joins : ToJoin<TableT|TableT["parents"][number]>[];
        readonly _parentJoins : undefined;
        readonly _selects : undefined;
        readonly _where : undefined;

        readonly _grouped : undefined;
        readonly _having : undefined;

        readonly _orders : undefined;
        readonly _limit : undefined;

        readonly _unions : undefined;
        readonly _unionOrders : undefined;
        readonly _unionLimit : undefined;

        readonly _mapDelegate : undefined;
    }>
);
export function from<
    TableT extends ITable
> (
    table : TableT
) : (
    From<TableT>
) {
    if (table.parents.length == 0) {
        return QueryUtil.newInstance()
            .from(table as any) as any;
    }
    let query : QueryUtil.AfterFromClause = QueryUtil.newInstance()
        .from(table as any);
    const alreadyJoined = new Set<string>();
    alreadyJoined.add(table.alias);

    for (let i=table.parents.length-1; i>=0; --i) {
        const parent = table.parents[i];
        if (alreadyJoined.has(parent.alias)) {
            continue;
        }
        alreadyJoined.add(parent.alias);

        const usingColumns = tryGetJoinCkUsingColumnArray(
            query, parent
        );
        if (usingColumns == undefined) {
            throw new Error(`Cannot join to ${parent.alias}; no candidate key to join to`);
        }
        query = QueryUtil.innerJoinCkUsing(
            query,
            parent as any,
            () => usingColumns as any
        ) as any;
    }
    return query as any;
}