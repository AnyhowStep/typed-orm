import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMapA: {};
export declare const columnMapB: {
    readonly commonA: o.Column<{
        tableAlias: "someTableB";
        name: "commonA";
        assertDelegate: sd.AssertDelegate<string>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableB";
        name: "commonB";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableB";
        name: "commonC";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly differentB: o.Column<{
        tableAlias: "someTableB";
        name: "differentB";
        assertDelegate: sd.AssertDelegate<null>;
    }>;
};
export declare const intersect: {} & {
    readonly commonA: o.Column<{
        tableAlias: "someTableB";
        name: "commonA";
        assertDelegate: sd.AssertDelegate<string>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableB";
        name: "commonB";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableB";
        name: "commonC";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly differentB: o.Column<{
        tableAlias: "someTableB";
        name: "differentB";
        assertDelegate: sd.AssertDelegate<null>;
    }>;
};
