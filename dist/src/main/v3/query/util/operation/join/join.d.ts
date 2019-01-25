import * as sd from "schema-decorator";
import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { IJoin, Join, JoinType } from "../../../../join";
import { ColumnRefUtil } from "../../../../column-ref";
import { NonEmptyTuple } from "../../../../tuple";
import { IColumn, ColumnUtil } from "../../../../column";
import { IAliasedTable } from "../../../../aliased-table";
import { Query } from "../../../query";
export declare type JoinFromDelegate<JoinsT extends IJoin[]> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<JoinsT>>) => (NonEmptyTuple<ColumnUtil.FromJoinArray<JoinsT>>));
export declare type JoinToColumn<AliasedTableT extends IAliasedTable, FromColumnT extends IColumn> = (IColumn<{
    tableAlias: AliasedTableT["alias"];
    name: Extract<keyof AliasedTableT["columns"], string>;
    assertDelegate: sd.AssertDelegate<ReturnType<FromColumnT["assertDelegate"]> | null>;
}>);
export declare type JoinToDelegate<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>> = ((columns: AliasedTableT["columns"]) => (ReturnType<FromDelegateT> extends [infer C0] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>, JoinToColumn<AliasedTableT, Extract<C4, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>, JoinToColumn<AliasedTableT, Extract<C4, IColumn>>, JoinToColumn<AliasedTableT, Extract<C5, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>, JoinToColumn<AliasedTableT, Extract<C4, IColumn>>, JoinToColumn<AliasedTableT, Extract<C5, IColumn>>, JoinToColumn<AliasedTableT, Extract<C6, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>, JoinToColumn<AliasedTableT, Extract<C4, IColumn>>, JoinToColumn<AliasedTableT, Extract<C5, IColumn>>, JoinToColumn<AliasedTableT, Extract<C6, IColumn>>, JoinToColumn<AliasedTableT, Extract<C7, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>, JoinToColumn<AliasedTableT, Extract<C4, IColumn>>, JoinToColumn<AliasedTableT, Extract<C5, IColumn>>, JoinToColumn<AliasedTableT, Extract<C6, IColumn>>, JoinToColumn<AliasedTableT, Extract<C7, IColumn>>, JoinToColumn<AliasedTableT, Extract<C8, IColumn>>] : ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8, infer C9] ? [JoinToColumn<AliasedTableT, Extract<C0, IColumn>>, JoinToColumn<AliasedTableT, Extract<C1, IColumn>>, JoinToColumn<AliasedTableT, Extract<C2, IColumn>>, JoinToColumn<AliasedTableT, Extract<C3, IColumn>>, JoinToColumn<AliasedTableT, Extract<C4, IColumn>>, JoinToColumn<AliasedTableT, Extract<C5, IColumn>>, JoinToColumn<AliasedTableT, Extract<C6, IColumn>>, JoinToColumn<AliasedTableT, Extract<C7, IColumn>>, JoinToColumn<AliasedTableT, Extract<C8, IColumn>>, JoinToColumn<AliasedTableT, Extract<C9, IColumn>>] : ColumnUtil.FromColumnMap<AliasedTableT["columns"]>[]));
export declare type JoinResult<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, NullableT extends boolean> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (QueryT["_joins"][number] | Join<{
        aliasedTable: AliasedTableT;
        columns: AliasedTableT["columns"];
        nullable: NullableT;
    }>)[];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare function join<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>, NullableT extends boolean>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>, nullable: NullableT, joinType: JoinType): (JoinResult<QueryT, AliasedTableT, NullableT>);
