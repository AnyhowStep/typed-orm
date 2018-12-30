import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ITable, TableUtil} from "../../../table";
import {ColumnType, MutableColumnNames} from "../query";
import {IConnection, UpdateResult} from "../../../execution";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil, IColumn} from "../../../column";
import {QueryUtil} from "../../../query";
import {CandidateKey} from "../../../candidate-key";
import {UpdateUtil, UpdatableQuery} from "../../../update";
import {AssignmentRef} from "../../../update/util";
import {Writable} from "../../../type";
import { ColumnIdentifierUtil } from "../../../column-identifier";
import { PrimitiveExpr } from "../../../primitive-expr";

export type AssignmentMap<TableT extends ITable> = (
    {
        [name in MutableColumnNames<TableT>]? : (
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
export type SetDelegateExtractRawExpr<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> = (
    Extract<
        ReturnType<DelegateT>[keyof ReturnType<DelegateT>],
        RawExpr<PrimitiveExpr>
    >
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


//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidSetDelegate_Hack<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>,
    ResultT
> = (
    (
        Exclude<
            ColumnIdentifierUtil.FromColumnRef<
                RawExprUtil.UsedRef<
                    SetDelegateExtractRawExpr<
                        TableT,
                        DelegateT
                    >
                >
            >,
            ColumnIdentifierUtil.FromColumnMap<
                TableT["columns"] |
                TableT["parents"][number]["columns"]
            >
        > extends never ?
        (
            Exclude<
                Extract<keyof ReturnType<DelegateT>, string>,
                MutableColumnNames<TableT>
            > extends never ?
            ResultT :
            [
                "The following columns cannot be updated",
                Exclude<
                    Extract<keyof ReturnType<DelegateT>, string>,
                    MutableColumnNames<TableT>
                >
            ]
        ) :
        [
            "The following referenced columns are not allowed",
            Exclude<
                ColumnIdentifierUtil.FromColumnRef<
                    RawExprUtil.UsedRef<
                        SetDelegateExtractRawExpr<
                            TableT,
                            DelegateT
                        >
                    >
                >,
                ColumnIdentifierUtil.FromColumnMap<
                    TableT["columns"] |
                    TableT["parents"][number]["columns"]
                >
            >
        ]
    )
);


export function updateZeroOrOne<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> (
    connection : IConnection & TableUtil.AssertHasCandidateKey<TableT>,
    table : TableT,
    ck : TableUtil.CandidateKey<TableT>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        Promise<UpdateResult>
    >
 ) {
    if (table.parents.length == 0) {
        return QueryUtil.newInstance()
            .from(table as any)
            .whereEqCandidateKey(table, ck)
            .set(delegate as any)
            .execute(connection) as any;
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
    return UpdateUtil.execute(update, connection) as any;
}