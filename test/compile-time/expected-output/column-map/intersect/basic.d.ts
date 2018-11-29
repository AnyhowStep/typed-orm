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
export declare const columnMapB: {
    readonly commonA: o.Column<{
        tableAlias: "someTableB";
        name: "commonA";
        assertDelegate: sd.AssertDelegate<string> & {
            __accepts: string;
            __canAccept: string;
        };
    }>;
    readonly commonB: o.Column<{
        tableAlias: "someTableB";
        name: "commonB";
        assertDelegate: sd.AssertDelegate<boolean> & {
            __accepts: boolean;
            __canAccept: boolean;
        };
    }>;
    readonly commonC: o.Column<{
        tableAlias: "someTableB";
        name: "commonC";
        assertDelegate: sd.AssertDelegate<boolean> & {
            __accepts: boolean;
            __canAccept: boolean;
        };
    }>;
    readonly differentB: o.Column<{
        tableAlias: "someTableB";
        name: "differentB";
        assertDelegate: sd.AssertDelegate<null> & {
            __accepts: null;
            __canAccept: null;
        };
    }>;
};
export declare const intersect: {
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
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
} & {
    readonly differentB: o.Column<{
        tableAlias: "someTableB";
        name: "differentB";
        assertDelegate: sd.AssertDelegate<null> & {
            __accepts: null;
            __canAccept: null;
        };
    }>;
};
