/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMapA: {
    readonly commonA: o.Column<{
        tableAlias: "someTableA";
        name: "commonA";
        assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableA";
        name: "commonB";
        assertDelegate: sd.AssertDelegate<Date>;
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableA";
        name: "commonC";
        assertDelegate: sd.AssertDelegate<boolean | null>;
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
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
export declare const leftIntersect: {
    readonly commonA: o.IColumn<{
        readonly tableAlias: "someTableA";
        readonly name: "commonA";
        readonly assertDelegate: sd.AssertDelegate<number & string>;
    }>;
    readonly commonB: o.IColumn<{
        readonly tableAlias: "someTableA";
        readonly name: "commonB";
        readonly assertDelegate: sd.AssertDelegate<(Date & false) | (Date & true)>;
    }>;
    readonly commonC: o.IColumn<{
        readonly tableAlias: "someTableA";
        readonly name: "commonC";
        readonly assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
