import {AfterSelectClause, OneSelectItemQuery, isOneSelectItemQuery, ZeroOrOneRowQuery, isZeroOrOneRowQuery} from "../predicate";
import {IAliasedTable, AliasedTable} from "../../../aliased-table";
import {IJoin} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMapUtil} from "../../../column-map";
import {SelectItemArrayUtil} from "../../../select-item-array";
import {queryTree_As, AssertDelegate, assertDelegate} from "../query";
import {SelectItem} from "../../../select-item";
import {ALIASED} from "../../../constants";
import {ASC, DESC} from "../../../order";

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
            asc : () => [
                //Should satisfy IExpr
                {
                    usedRef : (
                        QueryT["_parentJoins"] extends IJoin[] ?
                        ColumnRefUtil.FromJoinArray<
                            Extract<QueryT["_parentJoins"], IJoin[]>
                        > :
                        {}
                    ),
                    assertDelegate : AssertDelegate<QueryT>,
                },
                typeof ASC
            ],
            desc : () => [
                //Should satisfy IExpr
                {
                    usedRef : (
                        QueryT["_parentJoins"] extends IJoin[] ?
                        ColumnRefUtil.FromJoinArray<
                            Extract<QueryT["_parentJoins"], IJoin[]>
                        > :
                        {}
                    ),
                    assertDelegate : AssertDelegate<QueryT>,
                },
                typeof DESC
            ],
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
        const d = assertDelegate(query);
        (aliasedTable as any).assertDelegate = d;
        (aliasedTable as any).tableAlias = ALIASED;
        (aliasedTable as any).asc = () => {
            return [
                {
                    usedRef : aliasedTable.usedRef,
                    assertDelegate : d,
                    queryTree : aliasedTable.unaliasedQuery,
                },
                ASC
            ];
        };
        (aliasedTable as any).desc = () => {
            return [
                {
                    usedRef : aliasedTable.usedRef,
                    assertDelegate : d,
                    queryTree : aliasedTable.unaliasedQuery,
                },
                DESC
            ];
        };
        return aliasedTable as any;
    } else {
        return aliasedTable as any;
    }
}
