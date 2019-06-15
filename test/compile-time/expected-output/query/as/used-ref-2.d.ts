import * as o from "../../../../../dist/src/main";
export declare const aliased: o.IAliasedTable<{
    usedRef: {
        readonly parent: {
            readonly a: o.Column<{
                tableAlias: "parent";
                name: "a";
                assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
            }>;
            readonly b: o.Column<{
                tableAlias: "parent";
                name: "b";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
            readonly c: o.Column<{
                tableAlias: "parent";
                name: "c";
                assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
            }>;
        };
    };
    alias: "aliased";
    columns: {
        readonly a: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "a";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
        }>;
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
