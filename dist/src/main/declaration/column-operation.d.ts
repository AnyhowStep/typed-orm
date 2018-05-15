import { IColumn, AnyColumn } from "./column";
import { TypeOf, RawColumnCollection } from "./column-collection";
import { Tuple, TupleKeys } from "./tuple";
export declare type ColumnToReference<ColumnT extends AnyColumn> = (ColumnT extends IColumn<infer TableNameT, infer NameT, infer TypeT> ? ({
    [table in TableNameT]: {
        [name in NameT]: IColumn<TableNameT, NameT, TypeT>;
    };
}) : never);
export declare type NullableColumnNames<RawColumnCollectionT extends RawColumnCollection> = ({
    [name in keyof RawColumnCollectionT]: (null extends TypeOf<RawColumnCollectionT[name]> ? name : never);
}[keyof RawColumnCollectionT]);
export declare type ColumnType<ColumnT extends AnyColumn> = (ColumnT extends IColumn<any, any, infer T> ? T : never);
export declare type HasDuplicateColumn<TupleT extends Tuple<AnyColumn>> = {
    [index in TupleKeys<TupleT>]: (Exclude<TupleKeys<TupleT>, index> extends never ? (never) : (TupleT[index] extends IColumn<infer TableNameT, infer NameT, any> ? ({
        [other in Exclude<TupleKeys<TupleT>, index>]: (TupleT[other] extends IColumn<infer OtherTableNameT, infer OtherNameT, any> ? (Extract<TupleT[index], TupleT[other]> extends never ? never : true) : (never));
    }[Exclude<TupleKeys<TupleT>, index>]) : (never)));
}[TupleKeys<TupleT>];
