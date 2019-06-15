import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {IJoin, JoinType} from "../../../../join";
import {ColumnRefUtil} from "../../../../column-ref";
import {IColumn, ColumnUtil} from "../../../../column";
import {NonEmptyTuple} from "../../../../tuple";
import {ColumnMapUtil} from "../../../../column-map";
import {StringUtil} from "../../../../string";
import {
    JoinResult,
    join
} from "../join";

export type JoinUsingColumnUnion<
    ColumnT extends IColumn,
    AliasedTableT extends IAliasedTable
> = (
    ColumnT extends IColumn ?
    (
        ColumnUtil.WithTableAlias<
            ColumnT,
            AliasedTableT["alias"]
        > extends
        //We use ToNullable<> here because we want
        //to be able to use JOINs with columns that
        //may be null.
        //So,
        //a.x : null|number
        //b.x : number
        //Given the above, we want to allow JOINs
        //on those two.
        //https://github.com/Microsoft/TypeScript/issues/28876
        ColumnUtil.ToInterface<ColumnUtil.ToNullable<
            ColumnUtil.FromColumnMap<AliasedTableT["columns"]>
        >> ?
        Extract<ColumnT, IColumn> :
        never
    ) :
    never
);
export function joinUsingColumns<
    ColumnsT extends IColumn[],
    AliasedTableT extends IAliasedTable
> (
    columns : ColumnsT,
    aliasedTable : AliasedTableT
) : JoinUsingColumnUnion<ColumnsT[number], AliasedTableT>[] {
    //During run-time, we cannot actually check if the assertDelegate
    //of a column matches...
    return columns.filter(column => {
        return aliasedTable.columns[column.name] != undefined;
    }) as any[];
}
export type JoinUsingDelegate<
    JoinsT extends IJoin[],
    AliasedTableT extends IAliasedTable
> = (
    (
        columns : (
            StringUtil.IsOneLiteral<JoinsT[number]["aliasedTable"]["alias"]> extends true ?
            ColumnMapUtil.FromColumnArray<
                JoinUsingColumnUnion<
                    ColumnUtil.FromJoin<JoinsT[number]>,
                    AliasedTableT
                >[]
            > :
            ColumnRefUtil.FromColumnArray<
                JoinUsingColumnUnion<
                    ColumnUtil.FromJoinArray<JoinsT>,
                    AliasedTableT
                >[]
            >
        )
    ) => (
        NonEmptyTuple<(
            JoinUsingColumnUnion<
                ColumnUtil.FromJoinArray<JoinsT>,
                AliasedTableT
            >
        )>
    )
);
export function joinUsing<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>,
    NullableT extends boolean
>(
    query : QueryT,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT,
    nullable : NullableT,
    joinType : JoinType
) : (
    JoinResult<
        QueryT,
        AliasedTableT,
        NullableT
    >
) {
    const usingColumns : JoinUsingColumnUnion<
        ColumnUtil.FromJoinArray<QueryT["_joins"]>,
        AliasedTableT
    >[] = joinUsingColumns(
        ColumnUtil.Array.fromJoinArray(query._joins as QueryT["_joins"]),
        aliasedTable as AliasedTableT
    );
    const using = usingDelegate(
        (
            query._joins.length == 1 ?
            ColumnMapUtil.fromColumnArray(usingColumns) :
            ColumnRefUtil.fromColumnArray(usingColumns)
        ) as any
    ) as ReturnType<UsingDelegateT>;

    return join<
        QueryT,
        AliasedTableT,
        () => ReturnType<any>,
        NullableT
    >(
        query,
        aliasedTable,
        () => using,
        () => using.map(c => aliasedTable.columns[c.name]) as any,
        nullable,
        joinType
    );
}