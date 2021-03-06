import { ColumnIdentifierMap } from "../../../column-identifier-map";
export declare type FromColumnIdentifierMap<ColumnMapT extends ColumnIdentifierMap> = (ColumnMapT extends ColumnIdentifierMap ? ColumnMapT[Extract<keyof ColumnMapT, string>] : never);
