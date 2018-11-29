/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../src/main";
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
export declare const columnIdentifierArray: ({
    readonly tableAlias: "someTable";
    readonly name: "x";
} | {
    readonly tableAlias: "someTable";
    readonly name: "y";
} | {
    readonly tableAlias: "someTable";
    readonly name: "z";
})[];
export declare const emptyColumnMap: {};
export declare const emptyColumnIdentifierArray: never[];
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
export declare const mixedColumnIdentifierArray: ({
    readonly tableAlias: "tableA";
    readonly name: "ax";
} | {
    readonly tableAlias: "tableA";
    readonly name: "ay";
} | {
    readonly tableAlias: "tableB";
    readonly name: "bx";
} | {
    readonly tableAlias: "tableB";
    readonly name: "by";
})[];
