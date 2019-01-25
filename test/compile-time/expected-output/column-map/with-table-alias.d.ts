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
export declare const columnMapWithTableAlias: {
    readonly x: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "x";
        readonly assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "y";
        readonly assertDelegate: sd.AssertDelegate<Date>;
    }>;
    readonly z: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "z";
        readonly assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
};
export declare const emptyColumnMap: {};
export declare const emptyColumnMapWithTableAlias: {};
export declare const unitColumnMap: {
    readonly a: o.Column<{
        tableAlias: "someTable";
        name: "a";
        assertDelegate: sd.AssertDelegate<string>;
    }>;
};
export declare const unitColumnMapWithTableAlias: {
    readonly a: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "a";
        readonly assertDelegate: sd.AssertDelegate<string>;
    }>;
};
export declare const untypedColumnMap: o.ColumnMap;
export declare const untypedColumnMapWithTableAlias: {
    readonly [x: string]: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: string;
        readonly assertDelegate: sd.AssertDelegate<any>;
    }>;
};
