import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const eq1: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        } & {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        };
    } & {};
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq2: o.Expr<{
    usedRef: {
        readonly table: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        };
    } & {};
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq3: o.Expr<{
    usedRef: {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        } & {
            readonly a: o.Column<{
                tableAlias: "table";
                name: "a";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
        };
    } & {};
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq4: o.Expr<{
    usedRef: {
        readonly table: {
            readonly a: o.Column<{
                tableAlias: "table";
                name: "a";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        } & {
            readonly b: o.Column<{
                tableAlias: "table";
                name: "b";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
        };
    } & {};
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq5: o.Expr<{
    usedRef: {
        readonly table: {
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        } & {
            readonly c: o.Column<{
                tableAlias: "table";
                name: "c";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
        };
    } & {};
    assertDelegate: sd.AssertDelegate<boolean>;
}>;
export declare const eq6: any;
export declare const eq7: any;
export declare const eq8: any;
export declare const eq9: any;
export declare const eq10: any;
