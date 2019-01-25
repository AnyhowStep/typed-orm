import { ColumnIdentifierMap } from "../column-identifier-map";
export interface ColumnIdentifierRef {
    readonly [tableAlias: string]: ColumnIdentifierMap;
}
