import { ColumnMap } from "../../column-map";
import { ColumnUtil } from "../../../column";
export declare type ToNullable<ColumnMapT extends ColumnMap> = ({
    readonly [columnName in keyof ColumnMapT]: (ColumnUtil.ToNullable<ColumnMapT[columnName]>);
});
export declare function toNullable<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): ToNullable<ColumnMapT>;
