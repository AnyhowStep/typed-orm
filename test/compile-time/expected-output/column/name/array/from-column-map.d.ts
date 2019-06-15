import * as o from "../../../../../../dist/src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
};
export declare const columnNameArray: ("x" | "y" | "z")[];
export declare const emptyColumnMap: {};
export declare const emptyColumnNameArray: never[];
export declare const mixedColumnMap: {
    readonly ax: o.Column<{
        tableAlias: "tableA";
        name: "ax";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly ay: o.Column<{
        tableAlias: "tableA";
        name: "ay";
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
} & {
    readonly bx: o.Column<{
        tableAlias: "tableB";
        name: "bx";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
    readonly by: o.Column<{
        tableAlias: "tableB";
        name: "by";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
};
export declare const mixedColumnNameArray: ("ax" | "ay" | "bx" | "by")[];
