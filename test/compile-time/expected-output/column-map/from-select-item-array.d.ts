/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const column: o.Column<{
    readonly tableAlias: "tableAlias";
    readonly name: "name";
    readonly assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
}>;
export declare const item: o.IExprSelectItem<{
    readonly usedRef: {
        someTable: {
            someColumn: o.IColumn<{
                tableAlias: "someTable";
                name: "someColumn";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    readonly assertDelegate: sd.AssertDelegate<Date>;
    readonly tableAlias: "someTableAlias";
    readonly alias: "someAlias";
}>;
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: sd.AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: string | number | Date;
        };
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
};
export declare const emptyColumnMap: {};
export declare const mixedColumnMap: {
    readonly ax: o.Column<{
        tableAlias: "tableA";
        name: "ax";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly ay: o.Column<{
        tableAlias: "tableA";
        name: "ay";
        assertDelegate: sd.AssertDelegate<string> & {
            __accepts: string;
            __canAccept: string;
        };
    }>;
} & {
    readonly bx: o.Column<{
        tableAlias: "tableB";
        name: "bx";
        assertDelegate: sd.AssertDelegate<boolean> & {
            __accepts: boolean;
            __canAccept: boolean;
        };
    }>;
    readonly by: o.Column<{
        tableAlias: "tableB";
        name: "by";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
};
export declare const selectItemArray: [typeof column, typeof item, typeof columnMap, typeof emptyColumnMap, typeof mixedColumnMap];
export declare const fromSelects: {
    readonly name: o.Column<{
        readonly tableAlias: "tableAlias";
        readonly name: "name";
        readonly assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: sd.AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: string | number | Date;
        };
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
    readonly ax: o.Column<{
        tableAlias: "tableA";
        name: "ax";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly ay: o.Column<{
        tableAlias: "tableA";
        name: "ay";
        assertDelegate: sd.AssertDelegate<string> & {
            __accepts: string;
            __canAccept: string;
        };
    }>;
    readonly bx: o.Column<{
        tableAlias: "tableB";
        name: "bx";
        assertDelegate: sd.AssertDelegate<boolean> & {
            __accepts: boolean;
            __canAccept: boolean;
        };
    }>;
    readonly by: o.Column<{
        tableAlias: "tableB";
        name: "by";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
    readonly someAlias: o.Column<{
        readonly tableAlias: "someTableAlias";
        readonly name: "someAlias";
        readonly assertDelegate: sd.AssertDelegate<Date>;
    }>;
};
