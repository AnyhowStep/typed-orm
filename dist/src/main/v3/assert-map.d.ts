import * as sd from "type-mapping";
import { IColumn } from "./column";
export declare type AssertMap = {
    readonly [columnName: string]: sd.AnySafeMapper;
};
export declare namespace AssertMapUtil {
    type NullableNameUnion<AssertMapT extends AssertMap> = ({
        [columnName in Extract<keyof AssertMapT, string>]: (null extends sd.OutputOf<AssertMapT[columnName]> ? columnName : never);
    }[Extract<keyof AssertMapT, string>]);
    function nullableNames<AssertMapT extends AssertMap>(assertMap: AssertMapT): (NullableNameUnion<AssertMapT>[]);
    type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
        [columnName in ColumnT["name"]]: ReturnType<ColumnT["assertDelegate"]>;
    } : never);
}
