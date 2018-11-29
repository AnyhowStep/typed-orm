/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMapA: {
    readonly commonA: o.Column<{
        tableAlias: "someTableA";
        name: "commonA";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableA";
        name: "commonB";
        assertDelegate: sd.AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: string | number | Date;
        };
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableA";
        name: "commonC";
        assertDelegate: sd.AssertDelegate<boolean | null> & {
            __accepts: boolean | null;
            __canAccept: boolean | null;
        };
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
};
export declare const columnMapB: {};
export declare const intersect: {
    readonly commonA: o.Column<{
        tableAlias: "someTableA";
        name: "commonA";
        assertDelegate: sd.AssertDelegate<number> & {
            __accepts: number;
            __canAccept: number;
        };
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableA";
        name: "commonB";
        assertDelegate: sd.AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: string | number | Date;
        };
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableA";
        name: "commonC";
        assertDelegate: sd.AssertDelegate<boolean | null> & {
            __accepts: boolean | null;
            __canAccept: boolean | null;
        };
    }>;
    readonly differentA: o.Column<{
        tableAlias: "someTableA";
        name: "differentA";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
} & {};
