/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: sd.AssertDelegate<Date>;
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
export declare const nullable: {
    readonly x: o.Column<{
        readonly tableAlias: "someTable";
        readonly name: "x";
        readonly assertDelegate: sd.AssertDelegate<number | null>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "someTable";
        readonly name: "y";
        readonly assertDelegate: sd.AssertDelegate<Date | null>;
    }>;
    readonly z: o.Column<{
        readonly tableAlias: "someTable";
        readonly name: "z";
        readonly assertDelegate: sd.AssertDelegate<Buffer | null>;
    }>;
};
export declare const emptyColumnMap: {};
export declare const emptyNullable: {};
export declare const mixedColumnMap: {
    readonly ax: o.Column<{
        tableAlias: "tableA";
        name: "ax";
        assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly ay: o.Column<{
        tableAlias: "tableA";
        name: "ay";
        assertDelegate: sd.AssertDelegate<string>;
    }>;
} & {
    readonly bx: o.Column<{
        tableAlias: "tableB";
        name: "bx";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly by: o.Column<{
        tableAlias: "tableB";
        name: "by";
        assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
export declare const mixedNullable: {
    readonly ax: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ax";
        readonly assertDelegate: sd.AssertDelegate<number | null>;
    }>;
    readonly ay: o.Column<{
        readonly tableAlias: "tableA";
        readonly name: "ay";
        readonly assertDelegate: sd.AssertDelegate<string | null>;
    }>;
    readonly bx: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "bx";
        readonly assertDelegate: sd.AssertDelegate<boolean | null>;
    }>;
    readonly by: o.Column<{
        readonly tableAlias: "tableB";
        readonly name: "by";
        readonly assertDelegate: sd.AssertDelegate<Buffer | null>;
    }>;
};
