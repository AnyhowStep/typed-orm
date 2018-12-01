import { ColumnIdentifier, ColumnIdentifierUtil } from "./column-identifier";
import { ColumnMap } from "./column-map";
export interface ColumnIdentifierMap {
    readonly [columnName: string]: ColumnIdentifier;
}
export declare namespace ColumnIdentifierMapUtil {
    type FromColumnMap<ColumnMapT extends ColumnMap> = ({
        readonly [columnName in Extract<keyof ColumnMapT, string>]: (ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>);
    });
    function assertIsSubset(a: ColumnIdentifierMap, b: ColumnIdentifierMap): void;
}
//# sourceMappingURL=column-identifier-map.d.ts.map