import * as sd from "schema-decorator";
import {AfterFromClause, AssertValidJoinTarget, assertValidJoinTarget} from "../../predicate";
import {IJoin, Join, JoinType} from "../../../../join";
import {ColumnRefUtil} from "../../../../column-ref";
import {NonEmptyTuple} from "../../../../tuple";
import {IColumn, ColumnUtil} from "../../../../column";
import {IAliasedTable} from "../../../../aliased-table";
import {ColumnMapUtil} from "../../../../column-map";
import {Query} from "../../../query";

export type JoinFromDelegate<JoinsT extends IJoin[]> = (
    (columns : ColumnRefUtil.ToConvenient<
        ColumnRefUtil.FromJoinArray<JoinsT>
    >) => (
        NonEmptyTuple<ColumnUtil.FromJoinArray<JoinsT>>
    )
);

export type JoinToColumn<
    AliasedTableT extends IAliasedTable,
    FromColumnT extends IColumn
> = (
    IColumn<{
        tableAlias : AliasedTableT["alias"],
        name : Extract<keyof AliasedTableT["columns"], string>,
        //We allow joining to columns that may potentially be `null`,
        //Of course, joining to `null` just results in the row not
        //appearing in the result set
        assertDelegate : sd.AssertDelegate<ReturnType<FromColumnT["assertDelegate"]>|null>
    }>
);

/*
    TODO-DEBATE Consider allowing JOIN'ing on parent query columns?
    What's the use-case?
*/
export type JoinToDelegate<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>
> = (
    (columns : AliasedTableT["columns"]) => (
        ReturnType<FromDelegateT> extends [infer C0] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C7, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C7, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C8, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8, infer C9] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C7, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C8, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C9, IColumn>>
        ] :
        //Turn off type-checking.
        //Surely a JOIN on anything more than 10 columns is a bit much...
        //Right?
        ColumnUtil.FromColumnMap<AliasedTableT["columns"]>[]
    )
);

export type JoinResult<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    NullableT extends boolean
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            QueryT["_joins"][number] |
            Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : NullableT,
            }>
        )[],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export function join<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>,
    NullableT extends boolean
> (
    query : QueryT,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>,
    nullable : NullableT,
    joinType : JoinType
) : (
    JoinResult<
        QueryT,
        AliasedTableT,
        NullableT
    >
) {
    if (query._joins == undefined) {
        throw new Error(`Cannot JOIN before FROM clause`);
    }
    assertValidJoinTarget(query, aliasedTable);

    const joins : QueryT["_joins"] = query._joins;
    const fromRef = ColumnRefUtil.fromJoinArray(joins);
    const from = fromDelegate(
        ColumnRefUtil.toConvenient(fromRef)
    );
    ColumnUtil.Array.assertIsColumnArray(from);
    const to = toDelegate(aliasedTable.columns);
    ColumnUtil.Array.assertIsColumnArray(to);
    if (from.length != to.length) {
        throw new Error(`Expected JOIN to have ${from.length} target columns`);
    }
    if (from.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    ColumnRefUtil.assertHasColumnIdentifiers(
        fromRef,
        from
    );
    ColumnMapUtil.assertHasColumnIdentifiers(
        aliasedTable.columns,
        to
    );

    const {
        _distinct,
        _sqlCalcFoundRows,

        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;
    return new Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins : [
            ...query._joins,
            new Join(
                {
                    aliasedTable,
                    columns : aliasedTable.columns,
                    nullable,
                },
                joinType,
                from,
                to,
            ),
        ],
        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    });
}