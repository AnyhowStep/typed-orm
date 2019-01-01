import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ITable, TableUtil} from "../../../table";
import {ColumnType, MutableColumnNames} from "../query";
import {IConnection, UpdateResult} from "../../../execution";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil,} from "../../../column";
import {QueryUtil} from "../../../query";
import {UpdateUtil, UpdatableQuery} from "../../../update";
import {AssignmentRef} from "../../../update/util";
import {Writable} from "../../../type";
import {ColumnIdentifierUtil} from "../../../column-identifier";
import {PrimitiveExpr} from "../../../primitive-expr";
import {from} from "./from";

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


export function updateZeroOrOneByCk<
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
    let query : UpdatableQuery = from(table as any);
    query = QueryUtil.whereEqCandidateKey(query, table, ck);

    const queryRef = ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentMap = delegate(ColumnRefUtil.toConvenient(queryRef) as any);
    const update = QueryUtil.set(
        query,
        () => toAssignmentRef(query, assignmentMap)
    );
    return UpdateUtil.execute(update, connection) as any;
}