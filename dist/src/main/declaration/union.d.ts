import { AnySelectTupleElement } from "./select";
import { IColumnExpr } from "./expr";
import { IColumn, AnyColumn } from "./column";
import { Tuple, TupleKeys, TupleLength } from "./tuple";
export declare type SelectTupleElementType<SelectTupleElementT extends AnySelectTupleElement> = (SelectTupleElementT extends IColumnExpr<any, any, any, infer TypeT> ? TypeT : SelectTupleElementT extends IColumn<any, any, infer TypeT> ? TypeT : SelectTupleElementT extends {
    [name: string]: AnyColumn;
} ? {
    [name in keyof SelectTupleElementT]: (SelectTupleElementT[name] extends IColumn<any, any, infer TypeT> ? TypeT : never);
} : never);
export declare type SelectTupleToType<TupleT extends Tuple<AnySelectTupleElement>> = ({
    [index in TupleKeys<TupleT>]: SelectTupleElementType<TupleT[index]>;
} & {
    length: TupleLength<TupleT>;
});
