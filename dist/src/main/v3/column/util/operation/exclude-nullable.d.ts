import { IColumn } from "../../column";
export declare type ExcludeNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? (null extends ReturnType<ColumnT["assertDelegate"]> ? never : ColumnT) : never);
//# sourceMappingURL=exclude-nullable.d.ts.map