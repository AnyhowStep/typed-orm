import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const aliased: o.IAliasedTable<{
    usedColumns: (o.Column<{
        tableAlias: "parent";
        name: "a";
        assertDelegate: sd.AssertDelegate<number>;
    }> | o.Column<{
        tableAlias: "parent";
        name: "b";
        assertDelegate: sd.AssertDelegate<string>;
    }> | o.Column<{
        tableAlias: "parent";
        name: "c";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>)[];
    alias: "aliased";
    columns: {
        readonly x: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "y";
            readonly assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly z: o.Column<{
            readonly tableAlias: "aliased";
            readonly name: "z";
            readonly assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    };
}>;
