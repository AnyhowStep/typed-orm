import * as o from "../../../../../dist/src/main";
export declare const aliased: o.IAliasedTable<{
    usedRef: {};
    alias: "aliased";
    columns: {
        readonly x: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "x";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "y";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly z: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "z";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
}>;
