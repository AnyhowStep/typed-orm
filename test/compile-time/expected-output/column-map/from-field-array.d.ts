import * as sd from "type-mapping";
import * as o from "../../../../dist/src/main";
export declare const columnMap: {
    readonly x: o.Column<{
        tableAlias: "someTable";
        name: "x";
        assertDelegate: sd.Mapper<unknown, number>;
    }>;
    readonly y: o.Column<{
        tableAlias: "someTable";
        name: "y";
        assertDelegate: sd.Mapper<unknown, Date>;
    }>;
    readonly z: o.Column<{
        tableAlias: "someTable";
        name: "z";
        assertDelegate: sd.Mapper<unknown, Buffer>;
    }>;
};
export declare const emptyColumnMap: {};
export declare const untypedColumnMap: {
    readonly [x: string]: o.Column<{
        tableAlias: "someUntypedTable";
        name: string;
        assertDelegate: sd.Mapper<unknown, any>;
    }>;
};
