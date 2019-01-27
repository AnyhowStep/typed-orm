/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const column: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const item: o.IExprSelectItem<{
    readonly usedColumns: o.IColumn<{
        tableAlias: "someTable";
        name: "someColumn";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>[];
    readonly assertDelegate: sd.AssertDelegate<Date>;
    readonly tableAlias: "someTableAlias";
    readonly alias: "someAlias";
}>;
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
export declare const emptyColumnMap: {};
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
export declare const selectItemArray: [typeof column, typeof item, typeof columnMap, typeof emptyColumnMap, typeof mixedColumnMap];
export declare const fromSelects: {
    readonly name: o.Column<{
        readonly tableAlias: "test";
        readonly name: "name";
        readonly assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly x: o.Column<{
        readonly tableAlias: "test";
        readonly name: "x";
        readonly assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "test";
        readonly name: "y";
        readonly assertDelegate: sd.AssertDelegate<Date>;
    }>;
    readonly z: o.Column<{
        readonly tableAlias: "test";
        readonly name: "z";
        readonly assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
    readonly ax: o.Column<{
        readonly tableAlias: "test";
        readonly name: "ax";
        readonly assertDelegate: sd.AssertDelegate<number>;
    }>;
    readonly ay: o.Column<{
        readonly tableAlias: "test";
        readonly name: "ay";
        readonly assertDelegate: sd.AssertDelegate<string>;
    }>;
    readonly bx: o.Column<{
        readonly tableAlias: "test";
        readonly name: "bx";
        readonly assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly by: o.Column<{
        readonly tableAlias: "test";
        readonly name: "by";
        readonly assertDelegate: sd.AssertDelegate<Buffer>;
    }>;
    readonly someAlias: o.Column<{
        readonly tableAlias: "test";
        readonly name: "someAlias";
        readonly assertDelegate: sd.AssertDelegate<Date>;
    }>;
};
