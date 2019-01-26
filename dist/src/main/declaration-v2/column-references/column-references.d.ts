import { AnyColumn } from "../column";
export declare type ColumnReferences = {
    readonly [tableAlias: string]: {
        readonly [columnName: string]: AnyColumn;
    };
};
export declare type PartialColumnReferences = {
    readonly [tableAlias in string]?: {
        readonly [columnName in string]?: (AnyColumn | undefined);
    } | undefined;
};
//# sourceMappingURL=column-references.d.ts.map