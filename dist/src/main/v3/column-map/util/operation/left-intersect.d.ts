import * as sd from "type-mapping";
import { ColumnMap } from "../../column-map";
import { IColumn } from "../../../column";
export declare type LeftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = ({
    readonly [columnName in Extract<keyof ColumnMapA, string>]: (columnName extends keyof ColumnMapB ? IColumn<{
        readonly tableAlias: ColumnMapA[columnName]["tableAlias"];
        readonly name: ColumnMapA[columnName]["name"];
        readonly assertDelegate: sd.SafeMapper<ReturnType<ColumnMapA[columnName]["assertDelegate"]> & ReturnType<ColumnMapB[columnName]["assertDelegate"]>>;
    }> : ColumnMapA[columnName]);
});
export declare function leftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (LeftIntersect<ColumnMapA, ColumnMapB>);
