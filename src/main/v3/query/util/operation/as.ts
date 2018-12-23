import {AfterSelectClause, OneSelectItemQuery, isOneSelectItemQuery, ZeroOrOneRowQuery, isZeroOrOneRowQuery} from "../predicate";
import {IAliasedTable, AliasedTable} from "../../../aliased-table";
import {IJoin} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMapUtil} from "../../../column-map";
import {SelectItemArrayUtil} from "../../../select-item-array";
import {queryTree_As, AssertDelegate, assertDelegate} from "../query";
import {SelectItem} from "../../../select-item";
import {ALIASED} from "../../../constants";

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
    QueryT extends {
        _parentJoins : IJoin[]|undefined,
        _selects : SelectItem[],
    },
    AliasT extends string
> = (
    IAliasedTable<{
        usedRef : (
            QueryT["_parentJoins"] extends IJoin[] ?
            ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> :
            {}
        ),
        alias : AliasT,
        columns : ColumnMapUtil.FromSelectItemArray<
            QueryT["_selects"],
            AliasT
        >,
    }> &
    (
        QueryT extends (OneSelectItemQuery<any> & ZeroOrOneRowQuery) ?
        //Should satisfy both IAliasedTable and IExprSelectItem after this
        {
            assertDelegate : AssertDelegate<QueryT>,
            tableAlias : typeof ALIASED,
        } :
        unknown
    )
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
    const aliasedTable = new AliasedTable(
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
    );

    if (isOneSelectItemQuery(query) && isZeroOrOneRowQuery(query)) {
        //Should satisfy IAliasedTable and IExprSelectItem after this
        (aliasedTable as any).assertDelegate = assertDelegate(query);
        (aliasedTable as any).tableAlias = ALIASED;
        return aliasedTable as any;
    } else {
        return aliasedTable as any;
    }
}
