import {AfterFromClause} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {LeftJoin, leftJoin} from "./left-join";
//TODO-REFACTOR Move this to QueryUtil, doesn't really
//belongs to JoinDeclarationUtil, I think
import {JoinDeclarationUtil} from "../../../join-declaration";
import {JoinUsingFromPkDelegate} from "./inner-join-from-pk";

//TODO-REFACTOR Fix this ugly shit
export function leftJoinUsingFromPk<
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
    LeftJoin<QueryT, ToTableT>
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
    return leftJoin(
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