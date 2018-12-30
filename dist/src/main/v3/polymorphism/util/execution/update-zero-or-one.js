"use strict";
/*import {RawExprNoUsedRef, RawExpr} from "../../../raw-expr";
import {ITable, TableUtil} from "../../../table";
import {RequiredColumnNames, OptionalColumnNames, uniqueGeneratedColumnNames, tryGetGeneratedNonAutoIncrementColumn, assertDelegate, ColumnType, TypeMap, MutableColumnNames} from "../query";
import {IConnection, UpdateResult} from "../../../execution";
import {InsertUtil} from "../../../insert";
import * as informationSchema from "../../../information-schema";
import {ColumnRefUtil} from "../../../column-ref";
import {IJoin} from "../../../join";
import {ColumnUtil, IColumn} from "../../../column";
import { QueryUtil, IQuery } from "../../../query";
import { CandidateKey } from "../../../candidate-key";
import { UpdateUtil } from "../../../update";
import { AssignmentRef, UpdatableQuery } from "../../../update/util";
import { Writable } from "../../../type";

export type AssignmentMap<TableT extends ITable> = (
    {
        [name in MutableColumnNames<TableT>] : (
            RawExpr<
                ColumnType<TableT, name>
            >
        )
    }
);

export type SetDelegate<TableT extends ITable> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromColumnArray<
                ColumnUtil.FromColumnMap<
                    TableT["columns"] |
                    TableT["parents"][number]["columns"]
                >[]
            >
        >
    ) => AssignmentMap<TableT>
);

function toAssignmentRef (query : UpdatableQuery, map : AssignmentMap<ITable>) : AssignmentRef<UpdatableQuery> {
    const ref : Writable<AssignmentRef<UpdatableQuery>> = {};
    for (let columnName in map) {
        for (let join of query._joins) {
            if (columnName in join.columns) {
                let m = ref[join.aliasedTable.alias];
                if (m == undefined) {
                    m = {};
                    ref[join.aliasedTable.alias] = m;
                }
                m[columnName] = map[columnName];
            }
        }
    }
    return ref;
}

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

export async function updateZeroOrOne<
    TableT extends ITable
> (
    connection : IConnection & TableUtil.AssertHasCandidateKey<TableT>,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : SetDelegate<TableT>
) : Promise<UpdateResult> {
    if (table.parents.length == 0) {
        return InsertUtil.insertAndFetch(
            connection,
            table,
            rawInsertRow as any
        ) as any;
    }
    let query : UpdatableQuery = QueryUtil.newInstance()
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
    query = QueryUtil.whereEqCandidateKey(query, table, ck);

    const queryRef = ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentMap = delegate(ColumnRefUtil.toConvenient(queryRef) as any);
    const update = QueryUtil.set(
        query,
        () => toAssignmentRef(query, assignmentMap)
    );
    return UpdateUtil.execute(update, connection);
}*/ 
//# sourceMappingURL=update-zero-or-one.js.map