import * as sd from "schema-decorator";
import { IColumn } from "./column";
export declare type AssertMap = {
    readonly [columnName: string]: sd.AnyAssertFunc;
};
export declare namespace AssertMapUtil {
    type NullableNameUnion<AssertMapT extends AssertMap> = ({
        [columnName in Extract<keyof AssertMapT, string>]: (null extends sd.TypeOf<AssertMapT[columnName]> ? columnName : never);
    }[Extract<keyof AssertMapT, string>]);
    function nullableNames<AssertMapT extends AssertMap>(assertMap: AssertMapT): (NullableNameUnion<AssertMapT>[]);
    type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
        [columnName in ColumnT["name"]]: ReturnType<ColumnT["assertDelegate"]>;
    } : never);
}
//# sourceMappingURL=assert-map.d.ts.map