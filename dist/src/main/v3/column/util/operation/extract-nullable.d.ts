import { IColumn } from "../../column";
export declare type ExtractNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? (null extends ReturnType<ColumnT["assertDelegate"]> ? ColumnT : never) : never);
//# sourceMappingURL=extract-nullable.d.ts.map