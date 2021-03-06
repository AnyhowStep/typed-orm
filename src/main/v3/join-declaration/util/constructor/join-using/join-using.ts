import {IAliasedTable} from "../../../../aliased-table";
import {ColumnUtil} from "../../../../column";
import {QueryUtil} from "../../../../query";
import {NonEmptyTuple} from "../../../../tuple";
import {ColumnMapUtil} from "../../../../column-map";
import {AssertValidJoinTarget} from "../../predicate";
import {JoinType} from "../../../../join";
import {JoinDeclaration} from "../../../join-declaration";
import {join} from "../join";

export type JoinUsingDelegate<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable
> = (
    (
        columns : ColumnMapUtil.FromColumnArray<
            QueryUtil.JoinUsingColumnUnion<
                ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                ToTableT
            >[]
        >
    ) => (
        NonEmptyTuple<
            QueryUtil.JoinUsingColumnUnion<
                ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                ToTableT
            >
        >
    )
);

export function joinUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>,
    NullableT extends boolean,
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT,
    nullable : NullableT,
    joinType : JoinType.INNER|JoinType.LEFT
) : (
    JoinDeclaration<{
        readonly fromTable : FromTableT;
        readonly toTable : ToTableT,
        readonly nullable : NullableT,
    }>
) {
    const usingColumns = (
        usingDelegate(fromTable.columns as any)
    ) as ReturnType<UsingDelegateT>;

    return join(
        fromTable,
        toTable as any,
        () => usingColumns as any,
        () => (
            usingColumns.map(c => toTable.columns[c.name])
        ) as any,
        nullable,
        joinType
    );
}