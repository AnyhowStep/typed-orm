import * as o from "../../../../../src/main";
export declare const columnMapA: {};
export declare const columnMapB: {
    readonly commonA: o.Column<{
        tableAlias: "someTableB";
        name: "commonA";
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableB";
        name: "commonB";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableB";
        name: "commonC";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
    readonly differentB: o.Column<{
        tableAlias: "someTableB";
        name: "differentB";
        assertDelegate: import("type-mapping").Mapper<unknown, null>;
    }>;
};
export declare const intersect: {} & {
    readonly commonA: o.Column<{
        tableAlias: "someTableB";
        name: "commonA";
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableB";
        name: "commonB";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableB";
        name: "commonC";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
    readonly differentB: o.Column<{
        tableAlias: "someTableB";
        name: "differentB";
        assertDelegate: import("type-mapping").Mapper<unknown, null>;
    }>;
};
