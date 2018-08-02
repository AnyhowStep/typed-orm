import { Tuple, TupleKeys, TupleLength } from "../tuple";
import { AnyColumn } from "./column";
import { ColumnUtil } from "./util";
export declare namespace ColumnTupleUtil {
    type WithTableAlias<TupleT extends Tuple<AnyColumn>, NewTableAliasT extends string> = ({
        [index in TupleKeys<TupleT>]: (TupleT[index] extends AnyColumn ? ColumnUtil.WithTableAlias<TupleT[index], NewTableAliasT> : never);
    } & {
        length: TupleLength<TupleT>;
    } & {
        "0": ColumnUtil.WithTableAlias<TupleT[0], NewTableAliasT>;
    } & AnyColumn[]);
    function withTableAlias<TupleT extends Tuple<any>, NewTableAliasT extends string>(tuple: TupleT, newTableAlias: NewTableAliasT): (WithTableAlias<TupleT, NewTableAliasT>);
    type HasDuplicate<TupleT extends Tuple<AnyColumn>> = (TupleT["length"] extends 1 ? false : ({
        [index in TupleKeys<TupleT>]: ({
            [other in Exclude<TupleKeys<TupleT>, index>]: (Extract<TupleT[index], TupleT[other]> extends never ? false : true);
        }[Exclude<TupleKeys<TupleT>, index>]);
    }[TupleKeys<TupleT>]));
    type MapToColumnNames<TupleT extends Tuple<AnyColumn>> = ({
        [index in TupleKeys<TupleT>]: (TupleT[index] extends AnyColumn ? TupleT[index]["name"] : never);
    } & {
        "0": TupleT[0]["name"];
        length: TupleLength<TupleT>;
    } & string[]);
}
//# sourceMappingURL=tuple-util.d.ts.map