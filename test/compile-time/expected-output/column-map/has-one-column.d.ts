import * as o from "../../../../dist/src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
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
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
};
export declare const unitColumnMapHasOneColumn: false;
export declare const unitColumnMapHasOneColumn2: true;
export declare const untypedColumnMap: o.ColumnMap;
export declare const untypedColumnMapHasOneColumn: false;
export declare const untypedColumnMapHasOneColumn2: true;
export declare const untypedColumnMapHasOneColumn3: boolean;
