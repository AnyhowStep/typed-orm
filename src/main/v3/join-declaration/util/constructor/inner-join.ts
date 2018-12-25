import {IAliasedTable} from "../../../aliased-table";
import {JoinType} from "../../../join";
import {JoinDeclaration} from "../../join-declaration";
import {JoinFromDelegate, JoinToDelegate, invokeJoinDelegate} from "./join-delegate";
import {AssertValidJoinTarget} from "../predicate";

export type InnerJoin<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    JoinDeclaration<{
        readonly fromTable : FromTableT;
        readonly toTable : ToTableT,
        readonly nullable : false,
    }>
);
export function innerJoin<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<FromTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<FromTableT, ToTableT, FromDelegateT>
) : InnerJoin<FromTableT, ToTableT> {
    return invokeJoinDelegate(
        fromTable,
        toTable,
        fromDelegate,
        toDelegate,
        false,
        JoinType.INNER
    );
}