import {ColumnRefUtil} from "../../../column-ref";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ITable, TableUtil} from "../../../table";
import {Update, UpdateModifier, Assignment, UpdatableQuery} from "../../update";
import {ColumnIdentifierUtil} from "../../../column-identifier";
import {multiTableUpdate, SetDelegate, AssertValidSetDelegate_Hack} from "./multi-table-update";
import {StringUtil} from "../../../string";

export type SingleTableAssignmentMap<TableT extends ITable> = (
    {
        readonly [columnName in TableT["mutable"][number]]? : (
            RawExpr<
                ReturnType<
                    TableT["columns"][columnName]["assertDelegate"]
                >
            >
        )
    }
);
export type SingleTableExtractRawExpr<MapT extends SingleTableAssignmentMap<ITable>> = (
    Extract<
        MapT[keyof MapT],
        //Gets rid of `undefined`
        RawExpr<PrimitiveExpr>
    >
);

export type SingleTableSetDelegate<QueryT extends UpdatableQuery> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromJoinArray<QueryT["_joins"]>
        >
    ) => SingleTableAssignmentMap<
        Extract<QueryT["_joins"][number]["aliasedTable"], ITable>
    >
);


//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidSingleTableSetDelegate_Hack<
    QueryT extends UpdatableQuery,
    DelegateT extends SingleTableSetDelegate<QueryT>
> = (
    (
        Exclude<
            ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<SingleTableExtractRawExpr<ReturnType<DelegateT>>>>,
            ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>
        > extends never ?
        unknown :
        [
            "The following referenced columns are not allowed",
            Exclude<
                ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<SingleTableExtractRawExpr<ReturnType<DelegateT>>>>,
                ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>
            >
        ]
    ) &
    (
        Extract<
            keyof ReturnType<DelegateT>,
            string
        > extends Extract<
            QueryT["_joins"][number]["aliasedTable"],
            ITable
        >["mutable"][number] ?
        unknown :
        [
            "The following columns cannot be updated",
            Exclude<
                Extract<
                    keyof ReturnType<DelegateT>,
                    string
                >,
                Extract<
                    QueryT["_joins"][number]["aliasedTable"],
                    ITable
                >["mutable"][number]
            >
        ]
    )
);

export type AssertValidSingleTableUpdatableQuery<
    QueryT extends UpdatableQuery
> = (
    Extract<
        QueryT["_joins"][number]["aliasedTable"],
        ITable
    >["alias"] extends never ?
    [
        "No updatable tables found"
    ] :
    StringUtil.IsOneLiteral<
        Extract<
            QueryT["_joins"][number]["aliasedTable"],
            ITable
        >["alias"]
    > extends true ?
    unknown :
    [
        "Multiple updatable tables found",
        Extract<QueryT["_joins"][number]["aliasedTable"], ITable>["alias"]
    ]
)

export function isSingleTableUpdatableQuery (query : UpdatableQuery) : boolean {
    const tables = query._joins
        .map(j => j.aliasedTable)
        .filter(j => TableUtil.isTable(j));
    return (tables.length == 1);
}

export function singleTableUpdate<
    QueryT extends UpdatableQuery,
    ModifierT extends UpdateModifier|undefined,
    DelegateT extends SingleTableSetDelegate<QueryT>
> (
    query : (
        QueryT &
        AssertValidSingleTableSetDelegate_Hack<QueryT, DelegateT> &
        AssertValidSingleTableUpdatableQuery<QueryT>
    ),
    modifier : ModifierT,
    delegate : DelegateT
) : (
    Update<{
        _query : QueryT,
        _assignments : Assignment[],
        _modifier : ModifierT,
    }>
);
export function singleTableUpdate<
    QueryT extends UpdatableQuery,
    ModifierT extends UpdateModifier|undefined,
    DelegateT extends SetDelegate<QueryT>
> (
    query : (
        QueryT &
        AssertValidSetDelegate_Hack<QueryT, DelegateT>
    ),
    modifier : ModifierT,
    delegate : DelegateT
) : (
    Update<{
        _query : QueryT,
        _assignments : Assignment[],
        _modifier : ModifierT,
    }>
);
export function singleTableUpdate<
    QueryT extends UpdatableQuery,
    ModifierT extends UpdateModifier|undefined,
    DelegateT extends SingleTableSetDelegate<QueryT>
> (
    query : (
        QueryT &
        AssertValidSingleTableSetDelegate_Hack<QueryT, DelegateT> &
        AssertValidSingleTableUpdatableQuery<QueryT>
    ),
    modifier : ModifierT,
    delegate : DelegateT
) : (
    Update<{
        _query : QueryT,
        _assignments : Assignment[],
        _modifier : ModifierT,
    }>
) {
    const tables = query._joins
        .map(j => j.aliasedTable)
        .filter(j => TableUtil.isTable(j));
    if (tables.length != 1) {
        throw new Error(`Expected one updatable table, found ${tables.length}`);
    }
    return multiTableUpdate(
        query as any,
        modifier,
        c => {
            const result = delegate(c as any);
            const keys = Object.keys(result);
            if (keys.length == 1 && keys[0] == tables[0].alias) {
                return result as any;
            } else {
                return {
                    [tables[0].alias] : result,
                } as any;
            }
        }
    ) as any;
}