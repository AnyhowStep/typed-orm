import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const aliased: o.AliasedTable<{
    readonly usedRef: {};
    readonly alias: "aliasedTable";
    readonly columns: {
        readonly x: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "y";
            readonly assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly z: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "z";
            readonly assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    };
}>;
export declare const emptyAliased: o.AliasedTable<{
    readonly usedRef: {};
    readonly alias: "emptyAliasedTable";
    readonly columns: {};
}>;
