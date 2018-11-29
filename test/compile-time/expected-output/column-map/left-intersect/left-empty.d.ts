import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";
export declare const columnMapA: {};
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
export declare const leftIntersect: {};
