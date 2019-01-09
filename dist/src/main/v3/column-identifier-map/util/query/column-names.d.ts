import { ColumnIdentifierMap } from "../../column-identifier-map";
export declare type ColumnNames<MapT extends ColumnIdentifierMap> = (MapT extends ColumnIdentifierMap ? Extract<keyof MapT, string> : never);
//# sourceMappingURL=column-names.d.ts.map