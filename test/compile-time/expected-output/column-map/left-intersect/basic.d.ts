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
export declare const leftIntersect: {
    readonly commonA: o.IColumn<{
        readonly tableAlias: "someTableA";
        readonly name: "commonA";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number & string>;
    }>;
    readonly commonB: o.IColumn<{
        readonly tableAlias: "someTableA";
        readonly name: "commonB";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, (Date & false) | (Date & true)>;
    }>;
    readonly commonC: o.IColumn<{
        readonly tableAlias: "someTableA";
        readonly name: "commonC";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
};
