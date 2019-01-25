import { AfterFromClause, AssertValidJoinTargetImpl } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { AssertValidJoinPkImpl } from "../join-pk";
import { JoinType } from "../../../../join";
import { JoinResult } from "../join";
export declare type JoinFromPkDelegate<QueryT extends AfterFromClause> = ((tables: {
    [tableAlias in (Extract<QueryT["_joins"][number]["aliasedTable"], ITable & {
        primaryKey: string[];
    }>["alias"])]: ({
        alias: tableAlias;
    });
}) => {
    alias: Extract<QueryT["_joins"][number]["aliasedTable"], ITable & {
        primaryKey: string[];
    }>["alias"];
});
export declare type AssertValidJoinFromPk_FromDelegateImpl<QueryT extends AfterFromClause, DelegateT extends JoinFromPkDelegate<QueryT>, ToTableT extends IAliasedTable> = (AssertValidJoinTargetImpl<QueryT, ToTableT> & AssertValidJoinPkImpl<ToTableT, Extract<QueryT["_joins"][number]["aliasedTable"], ReturnType<DelegateT>>>);
export declare type AssertValidJoinFromPk_FromDelegate<QueryT extends AfterFromClause, DelegateT extends JoinFromPkDelegate<QueryT>, ToTableT extends IAliasedTable> = (ToTableT & AssertValidJoinFromPk_FromDelegateImpl<QueryT, DelegateT, ToTableT>);
export declare function joinFromPk<QueryT extends AfterFromClause, DelegateT extends JoinFromPkDelegate<QueryT>, ToTableT extends IAliasedTable, NullableT extends boolean>(query: QueryT, delegate: DelegateT, toTable: AssertValidJoinFromPk_FromDelegate<QueryT, DelegateT, ToTableT>, nullable: NullableT, joinType: JoinType): (JoinResult<QueryT, ToTableT, NullableT>);
