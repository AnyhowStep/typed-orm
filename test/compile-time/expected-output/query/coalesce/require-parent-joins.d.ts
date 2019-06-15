import * as o from "../../../../../dist/src/main";
export declare const coalesced: o.Expr<{
    usedRef: {
        readonly parent: {
            readonly a: o.Column<{
                tableAlias: "parent";
                name: "a";
                assertDelegate: import("type-mapping").Mapper<unknown, number>;
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
    assertDelegate: import("type-mapping").Mapper<unknown, number>;
}>;
