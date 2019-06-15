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
export declare const emptyColumnMap: {};
export declare const untypedColumnMap: {
    readonly [x: string]: o.Column<{
        tableAlias: "someUntypedTable";
        name: string;
        assertDelegate: import("type-mapping").Mapper<unknown, any>;
    }>;
};
