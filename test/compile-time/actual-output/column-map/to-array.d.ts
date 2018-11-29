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
export declare const columnArray: (o.Column<{
    tableAlias: "someTable";
    name: "x";
    assertDelegate: sd.AssertDelegate<number> & {
        __accepts: number;
        __canAccept: number;
    };
}> | o.Column<{
    tableAlias: "someTable";
    name: "y";
    assertDelegate: sd.AssertDelegate<Date> & {
        __accepts: Date;
        __canAccept: string | number | Date;
    };
}> | o.Column<{
    tableAlias: "someTable";
    name: "z";
    assertDelegate: sd.AssertDelegate<Buffer> & {
        __accepts: Buffer;
        __canAccept: Buffer;
    };
}>)[];
export declare const emptyColumnMap: {};
export declare const emptyColumnArray: never[];
