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
export declare const columnMapWithTableAlias: {
    readonly x: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "x";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>;
    readonly y: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "y";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    }>;
    readonly z: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "z";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
    }>;
};
export declare const emptyColumnMap: {};
export declare const emptyColumnMapWithTableAlias: {};
export declare const unitColumnMap: {
    readonly a: o.Column<{
        tableAlias: "someTable";
        name: "a";
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
};
export declare const unitColumnMapWithTableAlias: {
    readonly a: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: "a";
        readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>;
};
export declare const untypedColumnMap: o.ColumnMap;
export declare const untypedColumnMapWithTableAlias: {
    readonly [x: string]: o.Column<{
        readonly tableAlias: "someAlias";
        readonly name: string;
        readonly assertDelegate: import("type-mapping").Mapper<unknown, any>;
    }>;
};
