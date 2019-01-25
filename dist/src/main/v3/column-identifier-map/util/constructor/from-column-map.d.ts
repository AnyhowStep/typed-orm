import { ColumnIdentifierUtil } from "../../../column-identifier";
import { ColumnMap } from "../../../column-map";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = ({
    readonly [columnName in Extract<keyof ColumnMapT, string>]: (ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>);
});
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
