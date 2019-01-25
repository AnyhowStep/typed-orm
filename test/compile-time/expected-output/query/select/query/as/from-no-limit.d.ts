import * as sd from "schema-decorator";
import * as o from "../../../../../../../dist/src/main";
export declare const selectItem: o.IAliasedTable<{
    usedRef: {};
    alias: "test";
    columns: {
        readonly x: o.Column<{
            readonly tableAlias: "test";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number>;
        }>;
    };
}>;
export declare const query: any;
export declare const n: "n";
