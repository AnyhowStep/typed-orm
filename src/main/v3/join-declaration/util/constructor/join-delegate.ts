import {IAliasedTable} from "../../../aliased-table";
import {IColumn, ColumnUtil} from "../../../column";
import {QueryUtil} from "../../../query";
import {NonEmptyTuple} from "../../../tuple";
import {AssertValidJoinTarget} from "../predicate";
import {ColumnMapUtil} from "../../../column-map";
import {JoinType} from "../../../join";
import {JoinDeclaration} from "../../join-declaration";

export type JoinFromDelegate<
    FromTableT extends IAliasedTable
> = (
    (
        columns : FromTableT["columns"]
    ) => NonEmptyTuple<ColumnUtil.FromColumnMap<FromTableT["columns"]>>
);
export type JoinToDelegate<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<FromTableT>
> = (
    (columns : ToTableT["columns"]) => (
        ReturnType<FromDelegateT> extends [infer C0] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C4, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C4, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C5, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C4, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C5, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C6, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C4, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C5, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C6, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C7, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C4, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C5, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C6, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C7, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C8, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8, infer C9] ?
        [
            QueryUtil.JoinToColumn<ToTableT, Extract<C0, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C1, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C2, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C3, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C4, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C5, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C6, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C7, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C8, IColumn>>,
            QueryUtil.JoinToColumn<ToTableT, Extract<C9, IColumn>>
        ] :
        //Turn off type-checking.
        //Surely a JOIN on anything more than 10 columns is a bit much...
        //Right?
        ColumnUtil.FromColumnMap<ToTableT["columns"]>[]
    )
);
export function invokeJoinDelegate<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<FromTableT>,
    NullableT extends boolean,
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<FromTableT, ToTableT, FromDelegateT>,
    nullable : NullableT,
    joinType : JoinType.INNER|JoinType.LEFT
) : (
    JoinDeclaration<{
        readonly fromTable : FromTableT;
        readonly toTable : ToTableT,
        readonly nullable : NullableT,
    }>
) {
    if (fromTable.alias == toTable.alias) {
        throw new Error(`Cannot join two tables with the same name`);
    }
    const fromColumns = fromDelegate(fromTable.columns);

    ColumnUtil.Array.assertIsColumnArray(fromColumns);
    if (fromColumns.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    ColumnMapUtil.assertHasColumnIdentifiers(
        fromTable.columns,
        fromColumns
    );

    const toColumns = toDelegate(toTable.columns);

    ColumnUtil.Array.assertIsColumnArray(toColumns);
    if (fromColumns.length != toColumns.length) {
        throw new Error(`Expected JOIN to have ${fromColumns.length} target columns`);
    }
    ColumnMapUtil.assertHasColumnIdentifiers(
        toTable.columns,
        toColumns
    );
    return new JoinDeclaration(
        {
            fromTable,
            toTable,
            nullable : nullable,
        },
        joinType,
        fromColumns,
        toColumns
    );
}