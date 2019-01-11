import * as sd from "schema-decorator";
import { ColumnMap } from "../../column-map";
import { IColumn } from "../../../column";
export declare type LeftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = ({
    readonly [columnName in Extract<keyof ColumnMapA, string>]: (columnName extends keyof ColumnMapB ? IColumn<{
        readonly tableAlias: ColumnMapA[columnName]["tableAlias"];
        readonly name: ColumnMapA[columnName]["name"];
        readonly assertDelegate: sd.AssertDelegate<ReturnType<ColumnMapA[columnName]["assertDelegate"]> & ReturnType<ColumnMapB[columnName]["assertDelegate"]>>;
    }> : ColumnMapA[columnName]);
});
export declare function leftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (LeftIntersect<ColumnMapA, ColumnMapB>);
//# sourceMappingURL=left-intersect.d.ts.map