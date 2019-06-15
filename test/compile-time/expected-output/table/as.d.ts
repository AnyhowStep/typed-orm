import * as o from "../../../../dist/src/main";
export declare const aliased: o.AliasedTable<{
    readonly usedRef: {};
    readonly alias: "aliasedTable";
    readonly columns: {
        readonly x: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "x";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly y: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "y";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly z: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "z";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
}>;
export declare const emptyAliased: o.AliasedTable<{
    readonly usedRef: {};
    readonly alias: "emptyAliasedTable";
    readonly columns: {};
}>;
