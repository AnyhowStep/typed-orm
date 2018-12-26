import {AfterFromClause, AssertValidJoinTargetImpl} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {AssertValidJoinPkImpl} from "../join-pk";
import {JoinType} from "../../../../join";
import {JoinResult, join} from "../join";

export type JoinFromPkDelegate<
    QueryT extends AfterFromClause
> = (
    (
        tables : {
            [tableAlias in (
                Extract<
                    QueryT["_joins"][number]["aliasedTable"],
                    ITable & { primaryKey : string[] }
                >["alias"]
            )] : (
                {
                    alias : tableAlias
                }
            )

        }
    ) => {
        alias : Extract<
            QueryT["_joins"][number]["aliasedTable"],
            ITable & { primaryKey : string[] }
        >["alias"]
    }
);

//TODO-REFACTOR Rename this
export type AssertValidJoinFromPk_FromDelegateImpl<
    QueryT extends AfterFromClause,
    DelegateT extends JoinFromPkDelegate<QueryT>,
    ToTableT extends IAliasedTable
> = (
    AssertValidJoinTargetImpl<
        QueryT,
        ToTableT
    > &
    AssertValidJoinPkImpl<
        ToTableT,
        Extract<
            QueryT["_joins"][number]["aliasedTable"],
            ReturnType<DelegateT>
        >
    >
);
//TODO-REFACTOR Rename this
export type AssertValidJoinFromPk_FromDelegate<
    QueryT extends AfterFromClause,
    DelegateT extends JoinFromPkDelegate<QueryT>,
    ToTableT extends IAliasedTable
> = (
    ToTableT &
    AssertValidJoinFromPk_FromDelegateImpl<
        QueryT,
        DelegateT,
        ToTableT
    >
);
export function joinFromPk<
    QueryT extends AfterFromClause,
    DelegateT extends JoinFromPkDelegate<QueryT>,
    ToTableT extends IAliasedTable,
    NullableT extends boolean
> (
    query : QueryT,
    delegate : DelegateT,
    toTable : AssertValidJoinFromPk_FromDelegate<
        QueryT,
        DelegateT,
        ToTableT
    >,
    nullable : NullableT,
    joinType : JoinType
) : (
    JoinResult<
        QueryT,
        ToTableT,
        NullableT
    >
) {
    const tables : {
        [tableAlias : string] : IAliasedTable
    } = {};
    for (let join of query._joins) {
        tables[join.aliasedTable.alias] = join.aliasedTable;
    }
    let delegateResult = delegate(tables as any);
    if (!(delegateResult.alias in tables)) {
        throw new Error(`Invalid from table ${delegateResult.alias}`);
    }
    const fromTable = tables[delegateResult.alias];

    return join<
        QueryT,
        ToTableT,
        () => any,
        NullableT
    >(
        query,
        toTable,
        () => (fromTable as unknown as { primaryKey : string[] }).primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => (fromTable as unknown as { primaryKey : string[] }).primaryKey.map(
            columnName => toTable.columns[columnName]
        ) as any,
        nullable,
        joinType
    );
}