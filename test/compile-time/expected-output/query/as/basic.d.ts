import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const aliased: o.IAliasedTable<{
    usedRef: {};
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
