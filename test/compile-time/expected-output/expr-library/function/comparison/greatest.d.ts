import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const expr1: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    } & {
        readonly table: {
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr2: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    } & {
        readonly table: {
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr3: o.Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr4: any;
export declare const expr5: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<number>;
}>;
export declare const expr6: any;
