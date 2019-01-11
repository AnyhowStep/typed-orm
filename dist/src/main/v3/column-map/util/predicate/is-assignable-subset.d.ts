import { ColumnMap } from "../../column-map";
import { ColumnUtil } from "../../../column";
export declare type IsAssignableSubset<A extends ColumnMap, B extends ColumnMap> = (Extract<keyof A, string> extends never ? true : string extends Extract<keyof A, string> ? boolean : string extends Extract<keyof B, string> ? boolean : Extract<keyof A, string> extends Extract<keyof B, string> ? ({
    [columnName in Extract<keyof A, string>]: (ColumnUtil.IsAssignableTo<A[columnName], B[columnName]>);
}[Extract<keyof A, string>]) : false);
//# sourceMappingURL=is-assignable-subset.d.ts.map