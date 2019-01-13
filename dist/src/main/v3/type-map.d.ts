import { ColumnMap } from "./column-map";
export declare namespace TypeMapUtil {
    type FromColumnMap<MapT extends ColumnMap> = (MapT extends ColumnMap ? {
        readonly [columnName in Extract<keyof MapT, string>]: (ReturnType<MapT[columnName]["assertDelegate"]>);
    } : never);
}
//# sourceMappingURL=type-map.d.ts.map