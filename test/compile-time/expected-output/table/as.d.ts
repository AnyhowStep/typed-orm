import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";
export declare const aliased: o.AliasedTable<{
    readonly alias: "aliasedTable";
    readonly name: "table";
    readonly columns: {
        readonly x: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number> & {
                __accepts: number;
                __canAccept: number;
            };
        }>;
        readonly y: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "y";
            readonly assertDelegate: sd.AssertDelegate<string> & {
                __accepts: string;
                __canAccept: string;
            };
        }>;
        readonly z: o.Column<{
            readonly tableAlias: "aliasedTable";
            readonly name: "z";
            readonly assertDelegate: sd.AssertDelegate<boolean> & {
                __accepts: boolean;
                __canAccept: boolean;
            };
        }>;
    };
}>;
export declare const emptyAliased: o.AliasedTable<{
    readonly alias: "emptyAliasedTable";
    readonly name: "table";
    readonly columns: {};
}>;