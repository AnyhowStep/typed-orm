import {AfterSelectClause} from "../predicate";
import {IAliasedTable, AliasedTable} from "../../../aliased-table";
import {IJoin} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMapUtil} from "../../../column-map";
import {SelectItemArrayUtil} from "../../../select-item-array";
import {queryTree_As} from "../query";

/*
    If IQuery is a RawExpr, then the result is,
    IExprSelectItem & IAlasedTable

    If IQuery is ZeroOrOneRowQuery, then the
    type is nullable.

    If IQuery is OneRowQuery, then the
    type is NOT nullable.

    -----

    If IQuery is not a RawExpr, then the result is
    IAlasedTable

    -----

    The query.as() operation is useful for joining
    to sub queries.

    To alias, no duplicate column names are allowed
    in the query.

    Selecting `table--x` and `other--x` is not allowed
    to alias the query.

    -----

    TODO IAliasedTable MUST have a usedRef and JOIN
    operations must check for compatible usedRef
*/
/*
    IExprSelectItem
    readonly usedRef : DataT["usedRef"]; = from _parentJoins
    readonly assertDelegate : DataT["assertDelegate"]; = from _selects[0]

    readonly tableAlias : DataT["tableAlias"]; = `__aliased`
    --> readonly alias : DataT["alias"];       = <alias>

    readonly unaliasedQuery : QueryTree; = QueryUtil.queryTree_RawExpr()

    -----

    IAliasedTable
    readonly usedRef : DataT["usedRef"]; = from _parentJoins

    --> readonly alias : DataT["alias"]; = <alias>
    readonly columns : DataT["columns"]; = No columnName overlap, from _selects

    readonly unaliasedQuery : QueryTree; = QueryUtil.queryTree_RawExpr()
*/
export type As<
    QueryT extends AfterSelectClause,
    AliasT extends string
> = (
    IAliasedTable<{
        usedRef : (
            QueryT["_parentJoins"] extends IJoin[] ?
            ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> :
            {}
        ),
        alias : AliasT,
        columns : ColumnMapUtil.FromSelectItemArray<QueryT["_selects"], AliasT>,
    }>
);

export type AssertAliasableQuery<
    QueryT extends AfterSelectClause
> = (
    QueryT &
    //No duplicate columnNames in _selects
    (
        SelectItemArrayUtil.DuplicateColumnName<QueryT["_selects"]> extends never ?
        unknown :
        [
            "Duplicate column names not allowed in selects",
            SelectItemArrayUtil.DuplicateColumnName<QueryT["_selects"]>
        ]
    )
);

export function as<
    QueryT extends AfterSelectClause,
    AliasT extends string
> (
    query : AssertAliasableQuery<QueryT>,
    alias : AliasT
) : As<QueryT, AliasT> {
    SelectItemArrayUtil.assertNoDuplicateColumnName(query._selects);
    return new AliasedTable(
        {
            usedRef : (
                query._parentJoins == undefined ?
                {} :
                ColumnRefUtil.fromJoinArray(query._parentJoins)
            ),
            alias,
            columns : ColumnMapUtil.fromSelectItemArray(query._selects, alias),
        },
        {
            unaliasedQuery : queryTree_As(query),
        }
    ) as any;
}