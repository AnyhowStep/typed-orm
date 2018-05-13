import {IColumn, AnyColumn} from "./column";
import {TypeOf, RawColumnCollection} from "./column-collection";

export type ColumnToReference<ColumnT extends AnyColumn> = (
    ColumnT extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
        (
            {
                [table in TableNameT] : {
                    [name in NameT] : IColumn<TableNameT, NameT, TypeT>
                }
            }
        ) :
        never//("Invalid ColumnT or cannot infer TableNameT/NameT/TypeT"|void|never)
);

export type NullableColumnNames<RawColumnCollectionT extends RawColumnCollection> = (
    {
        [name in keyof RawColumnCollectionT] : (
            null extends TypeOf<RawColumnCollectionT[name]> ?
                name :
                never
        )
    }[keyof RawColumnCollectionT]
);

export type ColumnType<ColumnT extends AnyColumn> = (
    ColumnT extends IColumn<any, any, infer T> ?
    T :
    never
);
