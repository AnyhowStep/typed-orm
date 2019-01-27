import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ITable} from "../../../table";
import {ColumnType, MutableColumnNames} from "../query";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil, IColumn} from "../../../column";
import {QueryUtil} from "../../../query";
import {UpdatableQuery} from "../../../update";
import {AssignmentRef, ExecutableUpdate} from "../../../update/util";
import {Writable} from "../../../type";
import {ColumnIdentifierUtil} from "../../../column-identifier";
import {PrimitiveExpr} from "../../../primitive-expr";
import {from} from "./from";
import {IAnonymousTypedExpr} from "../../../expr";

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
            ColumnIdentifierUtil.FromColumn<
                //Weird that this needs to be wrapped in Extract<>
                Extract<
                    RawExprUtil.UsedColumns<
                        SetDelegateExtractRawExpr<
                            TableT,
                            DelegateT
                        >
                    >,
                    IColumn
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
                ColumnIdentifierUtil.FromColumn<
                    //Weird that this needs to be wrapped in Extract<>
                    Extract<
                        RawExprUtil.UsedColumns<
                            SetDelegateExtractRawExpr<
                                TableT,
                                DelegateT
                            >
                        >,
                        IColumn
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


export function update<
    TableT extends ITable,
    DelegateT extends SetDelegate<TableT>
> (
    table : TableT,
    where : IAnonymousTypedExpr<boolean>,
    delegate : DelegateT
) : (
    AssertValidSetDelegate_Hack<
        TableT,
        DelegateT,
        ExecutableUpdate
    >
) {
    if (table.parents.length == 0) {
        const result : ExecutableUpdate = QueryUtil.newInstance()
            .from(table as any)
            .__unsafeWhere(() => where)
            .set(delegate as any);
        return result as any;
    }
    let query : UpdatableQuery = from(table as any);
    query = QueryUtil.where(query, () => where);

    const queryRef = ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentMap = delegate(ColumnRefUtil.toConvenient(queryRef) as any);
    const update : ExecutableUpdate = QueryUtil.set(
        query,
        () => toAssignmentRef(query, assignmentMap)
    );
    return update as any;
}