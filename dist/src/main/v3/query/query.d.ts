import { IJoin } from "../join";
import { IAliasedTable } from "../aliased-table";
import { SelectItem } from "../select-item";
import { IExpr } from "../expr";
import * as QueryUtil from "./util";
export interface UnionQuery {
    readonly distinct: boolean;
    readonly query: IQuery;
}
export interface Limit {
    readonly rowCount: number;
    readonly offset: number;
}
export interface QueryData {
    readonly joins: IJoin[] | undefined;
    readonly parentJoins: IJoin[] | undefined;
    readonly unions: UnionQuery[] | undefined;
    readonly selects: SelectItem[] | undefined;
    readonly limit: Limit | undefined;
    readonly unionLimit: Limit | undefined;
}
export interface ExtraQueryData {
    readonly where: IExpr | undefined;
}
export interface IQuery<DataT extends QueryData = QueryData> {
    readonly joins: DataT["joins"];
    readonly parentJoins: DataT["parentJoins"];
    readonly unions: DataT["unions"];
    readonly selects: DataT["selects"];
    readonly limit: DataT["limit"];
    readonly unionLimit: DataT["unionLimit"];
    readonly extraData: ExtraQueryData;
}
export declare class Query<DataT extends QueryData> {
    readonly joins: DataT["joins"];
    readonly parentJoins: DataT["parentJoins"];
    readonly unions: DataT["unions"];
    readonly selects: DataT["selects"];
    readonly limit: DataT["limit"];
    readonly unionLimit: DataT["unionLimit"];
    readonly extraData: ExtraQueryData;
    constructor(data: DataT, extraData: ExtraQueryData);
    from<AliasedTableT extends IAliasedTable>(this: Extract<this, QueryUtil.BeforeFromClause>, aliasedTable: QueryUtil.AssertUniqueJoinTarget<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>): (QueryUtil.From<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>);
    innerJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["joins"]>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertUniqueJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT, FromDelegateT>): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    leftJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["joins"]>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertUniqueJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT, FromDelegateT>): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    rightJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["joins"]>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertUniqueJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT, FromDelegateT>): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    innerJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertUniqueJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    leftJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertUniqueJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
}
export declare function from<AliasedTableT extends IAliasedTable>(aliasedTable: QueryUtil.AssertUniqueJoinTarget<QueryUtil.NewInstance, AliasedTableT>): (QueryUtil.From<QueryUtil.NewInstance, AliasedTableT>);
//# sourceMappingURL=query.d.ts.map