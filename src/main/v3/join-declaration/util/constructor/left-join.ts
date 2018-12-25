import {IAliasedTable} from "../../../aliased-table";
import {JoinType} from "../../../join";
import {JoinDeclaration} from "../../join-declaration";
import {JoinFromDelegate, JoinToDelegate, invokeJoinDelegate} from "./join-delegate";
import {AssertValidJoinTarget} from "../predicate";

export type LeftJoin<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    JoinDeclaration<{
        readonly fromTable : FromTableT;
        readonly toTable : ToTableT,
        readonly nullable : true,
    }>
);
export function leftJoin<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<FromTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<FromTableT, ToTableT, FromDelegateT>
) : LeftJoin<FromTableT, ToTableT> {
    return invokeJoinDelegate(
        fromTable,
        toTable,
        fromDelegate,
        toDelegate,
        true,
        JoinType.LEFT
    );
}