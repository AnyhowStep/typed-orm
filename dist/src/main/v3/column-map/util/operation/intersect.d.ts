import { ColumnMap } from "../../column-map";
import { LeftIntersect } from "./left-intersect";
export declare type Intersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = (LeftIntersect<ColumnMapA, ColumnMapB> & {
    readonly [columnName in Exclude<Extract<keyof ColumnMapB, string>, keyof ColumnMapA>]: (ColumnMapB[columnName]);
});
export declare function intersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (Intersect<ColumnMapA, ColumnMapB>);
//# sourceMappingURL=intersect.d.ts.map