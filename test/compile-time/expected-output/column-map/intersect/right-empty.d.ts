import * as o from "../../../../../src/main";
export declare const columnMapA: {
    readonly commonA: o.Column<{
        tableAlias: "someTableA";
        name: "commonA";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableA";
        name: "commonB";
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableA";
        name: "commonC";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean | null>;
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
};
export declare const columnMapB: {};
export declare const intersect: {
    readonly commonA: o.Column<{
        tableAlias: "someTableA";
        name: "commonA";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableA";
        name: "commonB";
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableA";
        name: "commonC";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean | null>;
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
} & {};
