import { IColumn } from "./column";
import { ColumnIdentifierUtil } from "../column-identifier";
export declare function isColumn(raw: any): raw is IColumn;
export declare type IsAssignableTo<A extends IColumn, B extends IColumn> = (boolean extends ColumnIdentifierUtil.IsEqual<A, B> ? (ReturnType<A["assertDelegate"]> extends ReturnType<B["assertDelegate"]> ? boolean : false) : ColumnIdentifierUtil.IsEqual<A, B> extends true ? (ReturnType<A["assertDelegate"]> extends ReturnType<B["assertDelegate"]> ? true : false) : false);
//# sourceMappingURL=predicate.d.ts.map