import { AfterFromClause, AssertValidJoinTargetImpl } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { ColumnUtil } from "../../../../column";
import { JoinType } from "../../../../join";
import { JoinResult } from "../join";
export declare type AssertValidJoinPkImpl<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}> = ((Extract<FromTableT["alias"], ToTableT["alias"]> extends never ? unknown : ["Cannot join two tables with the same name", Extract<FromTableT["alias"], ToTableT["alias"]>]) & (ToTableT["primaryKey"][number] extends ColumnUtil.FromColumnMap<FromTableT["columns"]>["name"] ? ((ColumnUtil.ToInterface<ColumnUtil.WithTableAlias<ColumnUtil.ToNullable<Extract<ColumnUtil.FromColumnMap<ToTableT["columns"]>, {
    name: ToTableT["primaryKey"][number];
}>>, string>>) extends (ColumnUtil.ToInterface<ColumnUtil.WithTableAlias<ColumnUtil.ToNullable<ColumnUtil.ToSuperType<Extract<ColumnUtil.FromColumnMap<FromTableT["columns"]>, {
    name: ToTableT["primaryKey"][number];
}>>>, string>>) ? unknown : [FromTableT["alias"], "has incompatible columns; expecting", Exclude<ColumnUtil.ToInterface<ColumnUtil.WithTableAlias<ColumnUtil.ToNullable<Extract<ColumnUtil.FromColumnMap<ToTableT["columns"]>, {
    name: ToTableT["primaryKey"][number];
}>>, string>>, ColumnUtil.ToInterface<ColumnUtil.WithTableAlias<ColumnUtil.ToNullable<ColumnUtil.ToSuperType<Extract<ColumnUtil.FromColumnMap<FromTableT["columns"]>, {
    name: ToTableT["primaryKey"][number];
}>>>, string>>>]) : [FromTableT["alias"], "is missing columns", Exclude<ToTableT["primaryKey"][number], ColumnUtil.FromColumnMap<FromTableT["columns"]>["name"]>]));
export declare type AssertValidJoinPk<FromTableT extends IAliasedTable, ToTableT extends ITable & {
    primaryKey: string[];
}> = (ToTableT & AssertValidJoinPkImpl<FromTableT, ToTableT>);
export declare type AssertValidJoinPk_FromDelegateImpl<QueryT extends AfterFromClause, DelegateT extends JoinPkDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}> = (AssertValidJoinTargetImpl<QueryT, ToTableT> & AssertValidJoinPkImpl<Extract<QueryT["_joins"][number]["aliasedTable"], ReturnType<DelegateT>>, ToTableT>);
export declare type AssertValidJoinPk_FromDelegate<QueryT extends AfterFromClause, DelegateT extends JoinPkDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}> = (ToTableT & AssertValidJoinPk_FromDelegateImpl<QueryT, DelegateT, ToTableT>);
export declare type JoinPkDelegate<QueryT extends AfterFromClause> = ((tables: {
    [tableAlias in QueryT["_joins"][number]["aliasedTable"]["alias"]]: ({
        alias: tableAlias;
    });
}) => {
    alias: QueryT["_joins"][number]["aliasedTable"]["alias"];
});
export declare function joinPk<QueryT extends AfterFromClause, DelegateT extends JoinPkDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}, NullableT extends boolean>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinPk_FromDelegate<QueryT, DelegateT, ToTableT>, nullable: NullableT, joinType: JoinType): (JoinResult<QueryT, ToTableT, NullableT>);
