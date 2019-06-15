import * as o from "../../../../dist/src/main";
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
export declare const nullable: {
    readonly x: o.Column<{
        readonly tableAlias: "someTable";
        readonly name: "x";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "someTable";
        readonly name: "y";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Date | null>;
    }>;
    readonly z: o.Column<{
        readonly tableAlias: "someTable";
        readonly name: "z";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer | null>;
    }>;
};
export declare const emptyColumnMap: {};
export declare const emptyNullable: {};
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
export declare const mixedNullable: {
    readonly ax: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ax";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number | null>;
    }>;
    readonly ay: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ay";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, string | null>;
    }>;
    readonly bx: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "bx";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean | null>;
    }>;
    readonly by: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "by";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer | null>;
    }>;
};
