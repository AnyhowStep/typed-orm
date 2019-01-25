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
export declare const emptyColumnMap: {};
export declare const untypedColumnMap: {
    readonly [x: string]: o.Column<{
        tableAlias: "someUntypedTable";
        name: any;
        assertDelegate: sd.AssertDelegate<any>;
    }>;
};
