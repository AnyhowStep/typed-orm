import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const table2: o.IAliasedTable<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    alias: "aliasedTable";
    columns: {
        readonly a: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "a";
            readonly assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly b: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "b";
            readonly assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly c: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "c";
            readonly assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    };
}>;
export declare const a: o.IAliasedTable<{
    readonly usedRef: {
        readonly table: {
            readonly x: o.IColumn<{
                readonly tableAlias: "table";
                readonly name: "x";
                readonly assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly y: o.IColumn<{
                readonly tableAlias: "table";
                readonly name: "y";
                readonly assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly z: o.IColumn<{
                readonly tableAlias: "table";
                readonly name: "z";
                readonly assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    readonly alias: "aliasedTable";
    readonly columns: {
        readonly a: o.IColumn<{
            readonly tableAlias: "aliasedTable";
            readonly name: "a";
            readonly assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly b: o.IColumn<{
            readonly tableAlias: "aliasedTable";
            readonly name: "b";
            readonly assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly c: o.IColumn<{
            readonly tableAlias: "aliasedTable";
            readonly name: "c";
            readonly assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    };
}>;
