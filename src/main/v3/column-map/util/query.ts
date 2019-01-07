import * as sd from "schema-decorator";
import {ColumnMap} from "../column-map";
import {IColumn} from "../../column";

/*
    Used for unions of ColumnMap

    (A|B)[columnName] will likely give you unknown or similar
*/
export type FindWithColumnName<
   ColumnMapT extends ColumnMap,
   ColumnNameT extends string
> = (
   ColumnMapT extends ColumnMap ?
   (
       ColumnNameT extends keyof ColumnMapT ?
       ColumnMapT[ColumnNameT] :
       never
   ) :
   never
);

export function getSortedColumnArray (columnMap : ColumnMap) : IColumn[] {
    const columnNames = Object.keys(columnMap);
    columnNames.sort();
    const result : IColumn[] = [];
    for (let columnName of columnNames) {
        result.push(columnMap[columnName]);
    }
    return result;
}

export type TableAlias<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"] :
    never
);

export type FindWithTableAlias<ColumnMapT extends ColumnMap, TableAliasT extends string> = (
    ColumnMapT extends ColumnMap ?
    Extract<
        ColumnMapT[Extract<keyof ColumnMapT, string>],
        { tableAlias : TableAliasT }
    > :
    never
);

//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type ColumnNames<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    Extract<keyof MapT, string> :
    never
);
export function columnNames<MapT extends ColumnMap> (
    columnMap : MapT
) : ColumnNames<MapT>[] {
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return Object.keys(columnMap) as ColumnNames<MapT>[];
}
export type NullableColumnNames<MapT extends ColumnMap> = (
    MapT extends ColumnMap ?
    {
        [columnName in Extract<keyof MapT, string>] : (
            null extends ReturnType<MapT[columnName]["assertDelegate"]> ?
            columnName :
            never
        )
    }[Extract<keyof MapT, string>] :
    never
);
export function nullableColumnNames<MapT extends ColumnMap> (
    columnMap : MapT
) : NullableColumnNames<MapT>[] {
    return Object.keys(columnMap)
        .filter(columnName => sd.isNullable(
            columnMap[columnName].assertDelegate
        )) as NullableColumnNames<MapT>[];
}