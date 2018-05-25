import { AnyAliasedTable } from "../aliased-table";
import { Tuple, TupleKeys, TupleLength } from "../tuple";
import { Column, AnyColumn } from "../column";
export declare type JoinToColumn<ToTableT extends AnyAliasedTable, FromColumnT extends AnyColumn> = ({
    [columnName in Extract<keyof ToTableT["columns"], string>]: (Column<ToTableT["alias"], columnName, ReturnType<FromColumnT["assertDelegate"]> | null>);
}[Extract<keyof ToTableT["columns"], string>]);
export declare type JoinTo<ToTableT extends AnyAliasedTable, FromT extends Tuple<AnyColumn>> = (FromT[TupleKeys<FromT>] extends AnyColumn ? ({
    [k in TupleKeys<FromT>]: (FromT[k] extends AnyColumn ? JoinToColumn<ToTableT, FromT[k]> : never);
} & {
    "0": JoinToColumn<ToTableT, FromT[0]>;
    length: TupleLength<FromT>;
} & AnyColumn[]) : never);
export declare type JoinToDelegate<ToTableT extends AnyAliasedTable, FromT extends Tuple<AnyColumn>> = ((t: ToTableT["columns"]) => JoinTo<ToTableT, FromT>);
