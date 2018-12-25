import {AfterFromClause} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {LeftJoin, leftJoin} from "./left-join";
//TODO-REFACTOR Move this to QueryUtil, doesn't really
//belongs to JoinDeclarationUtil, I think
import {JoinDeclarationUtil} from "../../../join-declaration";
import {FromTableDelegate} from "./inner-join-using-pk";

//TODO-REFACTOR Most of this code is copy-pasted, duplicate code
export function leftJoinUsingPk<
    QueryT extends AfterFromClause,
    FromDelegateT extends FromTableDelegate<QueryT>,
    ToTableT extends ITable & { primaryKey : string[] }
> (
    query : QueryT,
    fromTableDelegate : FromDelegateT,
    toTable : JoinDeclarationUtil.AssertValidJoinUsingPkTarget<
        Extract<
            QueryT["_joins"][number]["aliasedTable"],
            ReturnType<FromDelegateT>
        >,
        ToTableT
    >
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
        () => toTable.primaryKey.map(
            columnName => fromTable.columns[columnName]
        ) as any,
        () => toTable.primaryKey.map(
            columnName => toTable.columns[columnName]
        ),
    );
}