import * as sd from "type-mapping";
import {IColumn} from "./column";

export type AssertMap = {
    readonly [columnName : string] : sd.AnySafeMapper
};

export namespace AssertMapUtil {
    export type NullableNameUnion<
        AssertMapT extends AssertMap
    > = (
        {
            [columnName in Extract<keyof AssertMapT, string>] : (
                null extends sd.OutputOf<AssertMapT[columnName]> ?
                columnName :
                never
            )
        }[Extract<keyof AssertMapT, string>]
    );
    export function nullableNames<AssertMapT extends AssertMap> (
        assertMap : AssertMapT
    ) : (
        NullableNameUnion<AssertMapT>[]
    ) {
        const columnNames = Object.keys(assertMap) as Extract<keyof AssertMapT, string>[];
        return columnNames.filter(
            columnName => sd.canOutputNull(assertMap[columnName])
        ) as any;
    }
    export type FromColumn<ColumnT extends IColumn> = (
        ColumnT extends IColumn ?
        {
            [columnName in ColumnT["name"]] : ReturnType<ColumnT["assertDelegate"]>
        } :
        never
    );
}