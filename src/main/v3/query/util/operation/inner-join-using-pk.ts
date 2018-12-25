import {AfterFromClause} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {InnerJoin, innerJoin} from "./inner-join";
//TODO-REFACTOR Move this to QueryUtil, doesn't really
//belongs to JoinDeclarationUtil, I think
import {JoinDeclarationUtil} from "../../../join-declaration";

export type FromTableDelegate<
    QueryT extends AfterFromClause
> = (
    (
        tables : {
            [tableAlias in QueryT["_joins"][number]["aliasedTable"]["alias"]] : (
                Extract<
                    QueryT["_joins"][number]["aliasedTable"],
                    {
                        alias : tableAlias
                    }
                >
            )

        }
    ) => QueryT["_joins"][number]["aliasedTable"]
);
export function innerJoinUsingPk<
    QueryT extends AfterFromClause,
    FromDelegateT extends FromTableDelegate<QueryT>,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    query : QueryT,
    fromTableDelegate : FromDelegateT,
    toTable : JoinDeclarationUtil.AssertValidJoinUsingPkTarget<
        ReturnType<FromDelegateT>,
        ToTableT
    >
) : (
    InnerJoin<QueryT, ToTableT>
) {
    const tables : {
        [tableAlias : string] : IAliasedTable
    } = {};
    for (let join of query._joins) {
        tables[join.aliasedTable.alias] = join.aliasedTable;
    }
    let fromTable = fromTableDelegate(tables as any);
    if (!(fromTable.alias in tables)) {
        throw new Error(`Invalid from table ${fromTable.alias}`);
    }
    //Just to be sure
    fromTable = tables[fromTable.alias];
    return innerJoin(
        query,
        toTable as any,
        () => toTable.primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => toTable.primaryKey.map(
            columnName => toTable.columns[columnName]
        ),
    );
}