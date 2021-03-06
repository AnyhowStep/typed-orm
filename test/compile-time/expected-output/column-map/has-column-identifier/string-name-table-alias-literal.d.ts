import * as o from "../../../../../src/main";
export declare const columnMap: {
    ax: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ax";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    ay: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ay";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    bx: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "bx";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
    by: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "by";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
};
declare type HasColumnIdentifier<ColumnIdentifierT extends o.ColumnIdentifier> = o.ColumnMapUtil.HasColumnIdentifier<typeof columnMap, ColumnIdentifierT>;
export declare const hasColumn: [HasColumnIdentifier<{
    tableAlias: "tableA";
    name: "ax";
}>, HasColumnIdentifier<{
    tableAlias: "tableA";
    name: "bx";
}>, HasColumnIdentifier<{
    tableAlias: "tableA";
    name: "doesNotExist";
}>, HasColumnIdentifier<{
    tableAlias: "tableA";
    name: string;
}>, HasColumnIdentifier<{
    tableAlias: string;
    name: "ax";
}>, HasColumnIdentifier<{
    tableAlias: string;
    name: "bx";
}>, HasColumnIdentifier<{
    tableAlias: string;
    name: "doesNotExist";
}>, HasColumnIdentifier<{
    tableAlias: string;
    name: string;
}>, HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: "ax";
}>, HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: "bx";
}>, HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: "doesNotExist";
}>, HasColumnIdentifier<{
    tableAlias: "doesNotExist";
    name: string;
}>];
export declare const hasColumnCheck: [true, false, false, boolean, boolean, boolean, false, boolean, false, false, false, false];
export declare const hasColumnCheckReverse: typeof hasColumn;
export {};
