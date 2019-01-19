import {AfterFromClause, AssertValidJoinTargetImpl} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {ColumnUtil} from "../../../../column";
import {JoinType} from "../../../../join";
import {JoinResult, join} from "../join";

export type AssertValidJoinPkImpl<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    (
        Extract<FromTableT["alias"], ToTableT["alias"]> extends never ?
        unknown :
        [
            "Cannot join two tables with the same name",
            Extract<FromTableT["alias"], ToTableT["alias"]>
        ]
    ) &
    (
        ToTableT["primaryKey"][number] extends ColumnUtil.FromColumnMap<FromTableT["columns"]>["name"] ?
        (
            (
                ColumnUtil.ToInterface<
                    ColumnUtil.WithTableAlias<
                        ColumnUtil.ToNullable<
                            Extract<
                                ColumnUtil.FromColumnMap<ToTableT["columns"]>,
                                { name : ToTableT["primaryKey"][number] }
                            >
                        >,
                        string
                    >
                >
            ) extends (
                ColumnUtil.ToInterface<
                    ColumnUtil.WithTableAlias<
                        ColumnUtil.ToNullable<
                            ColumnUtil.ToSuperType<
                                Extract<
                                    ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                                    { name : ToTableT["primaryKey"][number] }
                                >
                            >
                        >,
                        string
                    >
                >
            ) ?
            unknown :
            [
                FromTableT["alias"],
                "has incompatible columns; expecting",
                Exclude<
                    ColumnUtil.ToInterface<
                        ColumnUtil.WithTableAlias<
                            ColumnUtil.ToNullable<
                                Extract<
                                    ColumnUtil.FromColumnMap<ToTableT["columns"]>,
                                    { name : ToTableT["primaryKey"][number] }
                                >
                            >,
                            string
                        >
                    >,
                    ColumnUtil.ToInterface<
                        ColumnUtil.WithTableAlias<
                            ColumnUtil.ToNullable<
                                ColumnUtil.ToSuperType<
                                    Extract<
                                        ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                                        { name : ToTableT["primaryKey"][number] }
                                    >
                                >
                            >,
                            string
                        >
                    >
                >
            ]
        ) :
        [
            FromTableT["alias"],
            "is missing columns",
            Exclude<
                ToTableT["primaryKey"][number],
                ColumnUtil.FromColumnMap<FromTableT["columns"]>["name"]
            >
        ]
    )
);
export type AssertValidJoinPk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    ToTableT &
    AssertValidJoinPkImpl<FromTableT, ToTableT>
);
//TODO-REFACTOR Rename this
export type AssertValidJoinPk_FromDelegateImpl<
    QueryT extends AfterFromClause,
    DelegateT extends JoinPkDelegate<QueryT>,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    AssertValidJoinTargetImpl<
        QueryT,
        ToTableT
    > &
    AssertValidJoinPkImpl<
        Extract<
            QueryT["_joins"][number]["aliasedTable"],
            ReturnType<DelegateT>
        >,
        ToTableT
    >
);
//TODO-REFACTOR Rename this
export type AssertValidJoinPk_FromDelegate<
    QueryT extends AfterFromClause,
    DelegateT extends JoinPkDelegate<QueryT>,
    ToTableT extends ITable & { primaryKey : string[] }
> = (
    ToTableT &
    AssertValidJoinPk_FromDelegateImpl<
        QueryT,
        DelegateT,
        ToTableT
    >
);
export type JoinPkDelegate<
    QueryT extends AfterFromClause
> = (
    (
        tables : {
            [tableAlias in QueryT["_joins"][number]["aliasedTable"]["alias"]] : (
                {
                    alias : tableAlias
                }
            )

        }
    ) => {
        alias : QueryT["_joins"][number]["aliasedTable"]["alias"]
    }
);
export function joinPk<
    QueryT extends AfterFromClause,
    DelegateT extends JoinPkDelegate<QueryT>,
    ToTableT extends ITable & { primaryKey : string[] },
    NullableT extends boolean
> (
    query : QueryT,
    delegate : DelegateT,
    toTable : AssertValidJoinPk_FromDelegate<
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
        () => toTable.primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => toTable.primaryKey.map(
            columnName => toTable.columns[columnName]
        ) as any,
        nullable,
        joinType
    );
}