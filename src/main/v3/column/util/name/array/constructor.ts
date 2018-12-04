import * as sd from "schema-decorator";
import * as Ctor from "../constructor";
import {ColumnMap} from "../../../../column-map";
import {ColumnRef} from "../../../../column-ref";
import {StringArrayUtil} from "../../../../string-array";

//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    Ctor.FromColumnMap<ColumnMapT>[]
);
//TODO Figure out naming convention
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return Object.keys(columnMap) as FromColumnMap<ColumnMapT>;
}

//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type FromColumnRef<ColumnRefT extends ColumnRef> = (
    Ctor.FromColumnRef<ColumnRefT>[]
);
//TODO Figure out naming convention
export function fromColumnRef<ColumnRefT extends ColumnRef> (
    columnRef : ColumnRefT
) : FromColumnRef<ColumnRefT> {
    const result = Object.keys(columnRef).reduce<string[]>(
        (memo, tableAlias) => {
            memo.push(...fromColumnMap(columnRef[tableAlias]));
            return memo;
        },
        []
    );
    return StringArrayUtil.uniqueString(result) as FromColumnRef<ColumnRefT>;
}


export type NullableFromColumnMap<ColumnMapT extends ColumnMap> = (
    Ctor.NullableFromColumnMap<ColumnMapT>[]
);
export function nullableFromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : NullableFromColumnMap<ColumnMapT> {
    return Object.keys(columnMap)
        .filter(columnName => sd.isNullable(
            columnMap[columnName].assertDelegate
        )) as NullableFromColumnMap<ColumnMapT>;
}