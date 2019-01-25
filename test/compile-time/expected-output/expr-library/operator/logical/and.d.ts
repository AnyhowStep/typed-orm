import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const and1: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and2: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and3: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly a: o.Column<{
                tableAlias: "table";
                name: "a";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and4: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly a: o.Column<{
                tableAlias: "table";
                name: "a";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {
        readonly table: {
            readonly b: o.Column<{
                tableAlias: "table";
                name: "b";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and5: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        } & {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    } & {} & {
        readonly table: {
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and6: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
    };
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const and7: o.Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
