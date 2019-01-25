import { ColumnIdentifier } from "../column-identifier";
export interface ColumnIdentifierMap {
    readonly [columnName: string]: ColumnIdentifier;
}
