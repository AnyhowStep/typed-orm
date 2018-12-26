import {AfterFromClause} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {InnerJoin, innerJoin} from "./inner-join";
//TODO-REFACTOR Move this to QueryUtil, doesn't really
//belongs to JoinDeclarationUtil, I think
import {JoinDeclarationUtil} from "../../../join-declaration";

//TODO-REFACTOR This ugly mess
export type JoinUsingFromPkDelegate<
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
export function innerJoinUsingFromPk<
    QueryT extends AfterFromClause,
    FromDelegateT extends JoinUsingFromPkDelegate<QueryT>,
    ToTableT extends IAliasedTable
> (
    query : QueryT,
    fromTableDelegate : FromDelegateT,
    toTable : (
        ToTableT &
        JoinDeclarationUtil.AssertValidJoinUsingPkTargetImpl<
            ToTableT,
            Extract<
                QueryT["_joins"][number]["aliasedTable"],
                ReturnType<FromDelegateT>
            >
        >
    )
) : (
    InnerJoin<QueryT, ToTableT>
) {
    const tables : {
        [tableAlias : string] : IAliasedTable
    } = {};
    for (let join of query._joins) {
        tables[join.aliasedTable.alias] = join.aliasedTable;
    }
    let fromTableObj = fromTableDelegate(tables as any);
    if (!(fromTableObj.alias in tables)) {
        throw new Error(`Invalid from table ${fromTableObj.alias}`);
    }
    //Just to be sure
    const fromTable = tables[fromTableObj.alias];
    return innerJoin(
        query,
        toTable as any,
        () => (fromTable as unknown as { primaryKey : string[] }).primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => (fromTable as unknown as { primaryKey : string[] }).primaryKey.map(
            columnName => toTable.columns[columnName]
        ),
    );
}