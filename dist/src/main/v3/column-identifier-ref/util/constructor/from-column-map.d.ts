import { ColumnMap, ColumnMapUtil } from "../../../column-map";
import { ColumnIdentifierUtil } from "../../../column-identifier";
import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { Writable } from "../../../type";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? {
    readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>]: ({
        readonly [columnName in ColumnMapUtil.FindWithTableAlias<ColumnMapT, tableAlias>["name"]]: (ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>);
    });
} : never);
export declare function appendColumnMap(ref: Writable<ColumnIdentifierRef>, columnMap: ColumnMap): Writable<ColumnIdentifierRef>;
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
