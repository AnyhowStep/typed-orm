import * as o from "../../../../../dist/src/main";
export declare const table2: o.IAliasedTable<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
            }>;
        };
    };
    alias: "aliasedTable";
    columns: {
        readonly a: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "a";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly b: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "b";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly c: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "c";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
}>;
export declare const a: o.IAliasedTable<{
    readonly usedRef: {
        readonly table: {
            readonly x: o.IColumn<{
                readonly tableAlias: "table";
                readonly name: "x";
                readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
            readonly y: o.IColumn<{
                readonly tableAlias: "table";
                readonly name: "y";
                readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
            readonly z: o.IColumn<{
                readonly tableAlias: "table";
                readonly name: "z";
                readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
            }>;
        };
    };
    readonly alias: "aliasedTable";
    readonly columns: {
        readonly a: o.IColumn<{
            readonly tableAlias: "aliasedTable";
            readonly name: "a";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly b: o.IColumn<{
            readonly tableAlias: "aliasedTable";
            readonly name: "b";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly c: o.IColumn<{
            readonly tableAlias: "aliasedTable";
            readonly name: "c";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
}>;
