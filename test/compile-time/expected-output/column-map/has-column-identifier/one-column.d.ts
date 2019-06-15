import * as o from "../../../../../src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
};
declare type HasColumnIdentifier<ColumnIdentifierT extends o.ColumnIdentifier> = o.ColumnMapUtil.HasColumnIdentifier<typeof columnMap, ColumnIdentifierT>;
export declare const hasColumn: [HasColumnIdentifier<{
    tableAlias: "someTable";
    name: "x";
}>, HasColumnIdentifier<{
    tableAlias: "someTable";
    name: "doesNotExist";
}>, HasColumnIdentifier<{
    tableAlias: "someTable";
    name: string;
}>];
export declare const hasColumnCheck: [true, false, boolean];
export declare const hasColumnCheckReverse: typeof hasColumn;
export declare const hasColumn2: [HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: "x";
}>, HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
}>, HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: string;
}>];
export declare const hasColumnCheck2: [false, false, false];
export declare const hasColumnCheckReverse2: typeof hasColumn2;
export declare const hasColumn3: [HasColumnIdentifier<{
    tableAlias: string;
    name: "x";
}>, HasColumnIdentifier<{
    tableAlias: string;
    name: "doesNotExist";
}>, HasColumnIdentifier<{
    tableAlias: string;
    name: string;
}>];
export declare const hasColumnCheck3: [boolean, false, boolean];
export declare const hasColumnCheckReverse3: typeof hasColumn3;
export {};
