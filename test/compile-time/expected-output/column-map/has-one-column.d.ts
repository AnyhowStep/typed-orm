/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const columnMap: {
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: sd.AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: string | number | Date;
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
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: sd.AssertDelegate<Buffer> & {
            __accepts: Buffer;
            __canAccept: Buffer;
        };
    }>;
};
export declare const columnMapHasOneColumn: false;
export declare const columnMapHasOneColumn2: true;
export declare const emptyColumnMap: {};
export declare const emptyColumnMapHasOneColumn: false;
export declare const emptyColumnMapHasOneColumn2: true;
export declare const unitColumnMap: {
    readonly a: o.Column<{
        tableAlias: "someTable";
        name: "a";
        assertDelegate: sd.AssertDelegate<string> & {
            __accepts: string;
            __canAccept: string;
        };
    }>;
};
export declare const unitColumnMapHasOneColumn: false;
export declare const unitColumnMapHasOneColumn2: true;
export declare const untypedColumnMap: o.ColumnMap;
export declare const untypedColumnMapHasOneColumn: false;
export declare const untypedColumnMapHasOneColumn2: true;
export declare const untypedColumnMapHasOneColumn3: boolean;
