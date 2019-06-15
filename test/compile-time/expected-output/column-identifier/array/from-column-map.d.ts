import * as o from "../../../../../dist/src/main";
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
export declare const columnIdentifierArray: ({
    readonly tableAlias: "someTable";
    readonly name: "x";
} | {
    readonly tableAlias: "someTable";
    readonly name: "y";
} | {
    readonly tableAlias: "someTable";
    readonly name: "z";
})[];
export declare const emptyColumnMap: {};
export declare const emptyColumnIdentifierArray: never[];
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
export declare const mixedColumnIdentifierArray: ({
    readonly tableAlias: "tableA";
    readonly name: "ax";
} | {
    readonly tableAlias: "tableA";
    readonly name: "ay";
} | {
    readonly tableAlias: "tableB";
    readonly name: "bx";
} | {
    readonly tableAlias: "tableB";
    readonly name: "by";
})[];
