import { AnyColumn } from "./column";
export declare type ColumnReferences = {
    [table: string]: {
        [column: string]: AnyColumn;
    };
};
export declare type PartialColumnReferences = {
    [table: string]: {
        [column: string]: AnyColumn | undefined;
    } | undefined;
};
