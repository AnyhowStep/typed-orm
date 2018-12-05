import * as sd from "schema-decorator";
import {AfterFromClause} from "../predicate";
import {IJoin} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {NonEmptyTuple} from "../../../tuple";
import {IColumn, ColumnUtil} from "../../../column";
import {IAliasedTable} from "../../../aliased-table";

export type JoinFromDelegate<JoinsT extends IJoin[]> = (
    (columns : ColumnRefUtil.ToConvenient<
        ColumnRefUtil.FromJoinArray<JoinsT>
    >) => (
        NonEmptyTuple<ColumnUtil.FromJoinArray<JoinsT>>
    )
);

export type JoinToColumn<
    AliasedTableT extends IAliasedTable,
    FromColumnT extends IColumn
> = (
    IColumn<{
        tableAlias : AliasedTableT["alias"],
        name : Extract<keyof AliasedTableT["columns"], string>,
        //We allow joining to columns that may potentially be `null`,
        //Of course, joining to `null` just results in the row not
        //appearing in the result set
        assertDelegate : sd.AssertDelegate<ReturnType<FromColumnT["assertDelegate"]>|null>
    }>
);

export type JoinToDelegate<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
> = (
    (columns : AliasedTableT["columns"]) => (
        ReturnType<FromDelegateT> extends [infer C0] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C7, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C7, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C8, IColumn>>
        ] :
        ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8, infer C9] ?
        [
            JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C7, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C8, IColumn>>,
            JoinToColumn<AliasedTableT, Extract<C9, IColumn>>
        ] :
        //Turn off type-checking.
        //Surely a JOIN on anything more than 10 columns is a bit much...
        //Right?
        ColumnUtil.FromColumnMap<AliasedTableT["columns"]>[]
    )
);