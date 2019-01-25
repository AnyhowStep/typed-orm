import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { ColumnIdentifierMapUtil } from "../../../column-identifier-map";
export declare type ColumnNames<RefT extends ColumnIdentifierRef> = (RefT extends ColumnIdentifierRef ? ColumnIdentifierMapUtil.ColumnNames<RefT[string]> : never);
