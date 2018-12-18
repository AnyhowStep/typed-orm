import {ColumnMap} from "../../../column-map";
import {ColumnRef} from "../../../column-ref";

//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    Extract<keyof ColumnMapT, string> :
    never
);
//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type FromColumnRef<ColumnRefT extends ColumnRef> = (
    ColumnRefT extends ColumnRef ?
    FromColumnMap<ColumnRefT[Extract<keyof ColumnRefT, string>]> :
    never
);
export type NullableFromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    {
        [columnName in Extract<keyof ColumnMapT, string>] : (
            null extends ReturnType<ColumnMapT[columnName]["assertDelegate"]> ?
            columnName :
            never
        )
    }[Extract<keyof ColumnMapT, string>] :
    never
);