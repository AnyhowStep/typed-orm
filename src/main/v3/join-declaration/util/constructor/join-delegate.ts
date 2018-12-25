import {IAliasedTable} from "../../../aliased-table";
import {IColumn, ColumnUtil} from "../../../column";
import {QueryUtil} from "../../../query";
import {NonEmptyTuple} from "../../../tuple";

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