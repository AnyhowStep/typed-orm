import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: (o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "table";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
                readonly y: o.Column<{
                    tableAlias: "table";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string>;
                }>;
                readonly z: o.Column<{
                    tableAlias: "table";
                    name: "z";
                    assertDelegate: sd.AssertDelegate<boolean>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("x" | "y" | "z")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "joined1";
            readonly columns: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: sd.AssertDelegate<string>;
                }>;
                readonly c: o.Column<{
                    tableAlias: "joined1";
                    name: "c";
                    assertDelegate: sd.AssertDelegate<boolean>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("a" | "b" | "c")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly a: o.Column<{
                tableAlias: "joined1";
                name: "a";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly c: o.Column<{
                tableAlias: "joined1";
                name: "c";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: [o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>, o.IExprSelectItem<{
        readonly usedRef: {
            readonly table: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
        };
        readonly assertDelegate: sd.AssertDelegate<number>;
        readonly tableAlias: "table";
        readonly alias: "aliased";
    }>, o.Expr<{
        readonly usedRef: {
            readonly table: {
                readonly y: o.IColumn<{
                    readonly tableAlias: "table";
                    readonly name: "y";
                    readonly assertDelegate: sd.AssertDelegate<string>;
                }>;
            } & {};
        } & {};
        readonly assertDelegate: sd.AssertDelegate<boolean>;
    }> & o.IExprSelectItem<{
        readonly usedRef: {
            readonly table: {
                readonly y: o.IColumn<{
                    readonly tableAlias: "table";
                    readonly name: "y";
                    readonly assertDelegate: sd.AssertDelegate<string>;
                }>;
            } & {};
        } & {};
        readonly assertDelegate: sd.AssertDelegate<boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "equal?";
    }>, o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }>, o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<string>;
    }>, {
        readonly a: o.Column<{
            tableAlias: "joined1";
            name: "a";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly b: o.Column<{
            tableAlias: "joined1";
            name: "b";
            assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly c: o.Column<{
            tableAlias: "joined1";
            name: "c";
            assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    }, o.Expr<{
        readonly usedRef: {
            readonly joined1: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
        } & {
            readonly table: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
        };
        readonly assertDelegate: sd.AssertDelegate<boolean>;
    }> & o.IExprSelectItem<{
        readonly usedRef: {
            readonly joined1: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
        } & {
            readonly table: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
        };
        readonly assertDelegate: sd.AssertDelegate<boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "thisEqual?";
    }>];
    readonly _where: undefined;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: undefined;
    readonly _limit: undefined;
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: undefined;
}>;
