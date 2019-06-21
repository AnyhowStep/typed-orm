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
                    assertDelegate: import("type-mapping").Mapper<unknown, number>;
                }>;
                readonly y: o.Column<{
                    tableAlias: "table";
                    name: "y";
                    assertDelegate: import("type-mapping").Mapper<unknown, string>;
                }>;
                readonly z: o.Column<{
                    tableAlias: "table";
                    name: "z";
                    assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
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
                assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
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
                    assertDelegate: import("type-mapping").Mapper<unknown, number>;
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: import("type-mapping").Mapper<unknown, string>;
                }>;
                readonly c: o.Column<{
                    tableAlias: "joined1";
                    name: "c";
                    assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
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
                assertDelegate: import("type-mapping").Mapper<unknown, number>;
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
            readonly c: o.Column<{
                tableAlias: "joined1";
                name: "c";
                assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: [o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
    }>, o.IExprSelectItem<{
        readonly usedRef: {
            readonly table: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: import("type-mapping").Mapper<unknown, number>;
                }>;
            };
        };
        readonly assertDelegate: import("type-mapping").Mapper<unknown, number>;
        readonly tableAlias: "table";
        readonly alias: "aliased";
    }>, {
        readonly queryTree: o.QueryTree;
        asc(): [{
            usedRef: {
                readonly table: {
                    readonly y: o.IColumn<{
                        readonly tableAlias: "table";
                        readonly name: "y";
                        readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
                    }>;
                } & {};
            } & {};
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, "ASC"];
        desc(): [{
            usedRef: {
                readonly table: {
                    readonly y: o.IColumn<{
                        readonly tableAlias: "table";
                        readonly name: "y";
                        readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
                    }>;
                } & {};
            } & {};
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, "DESC"];
        sort(sortDirection: o.SortDirection): [{
            usedRef: {
                readonly table: {
                    readonly y: o.IColumn<{
                        readonly tableAlias: "table";
                        readonly name: "y";
                        readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
                    }>;
                } & {};
            } & {};
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, o.SortDirection];
        readonly usedRef: {
            readonly table: {
                readonly y: o.IColumn<{
                    readonly tableAlias: "table";
                    readonly name: "y";
                    readonly assertDelegate: import("type-mapping").Mapper<unknown, string>;
                }>;
            } & {};
        } & {};
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "equal?";
        readonly unaliasedQuery: o.QueryTree;
    }, o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: import("type-mapping").Mapper<unknown, number>;
    }>, o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: import("type-mapping").Mapper<unknown, string>;
    }>, {
        readonly a: o.Column<{
            tableAlias: "joined1";
            name: "a";
            assertDelegate: import("type-mapping").Mapper<unknown, number>;
        }>;
        readonly b: o.Column<{
            tableAlias: "joined1";
            name: "b";
            assertDelegate: import("type-mapping").Mapper<unknown, string>;
        }>;
        readonly c: o.Column<{
            tableAlias: "joined1";
            name: "c";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    }, {
        readonly queryTree: o.QueryTree;
        asc(): [{
            usedRef: {
                readonly joined1: {
                    readonly a: o.Column<{
                        tableAlias: "joined1";
                        name: "a";
                        assertDelegate: import("type-mapping").Mapper<unknown, number>;
                    }>;
                };
            } & {
                readonly table: {
                    readonly x: o.Column<{
                        tableAlias: "table";
                        name: "x";
                        assertDelegate: import("type-mapping").Mapper<unknown, number>;
                    }>;
                };
            };
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, "ASC"];
        desc(): [{
            usedRef: {
                readonly joined1: {
                    readonly a: o.Column<{
                        tableAlias: "joined1";
                        name: "a";
                        assertDelegate: import("type-mapping").Mapper<unknown, number>;
                    }>;
                };
            } & {
                readonly table: {
                    readonly x: o.Column<{
                        tableAlias: "table";
                        name: "x";
                        assertDelegate: import("type-mapping").Mapper<unknown, number>;
                    }>;
                };
            };
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, "DESC"];
        sort(sortDirection: o.SortDirection): [{
            usedRef: {
                readonly joined1: {
                    readonly a: o.Column<{
                        tableAlias: "joined1";
                        name: "a";
                        assertDelegate: import("type-mapping").Mapper<unknown, number>;
                    }>;
                };
            } & {
                readonly table: {
                    readonly x: o.Column<{
                        tableAlias: "table";
                        name: "x";
                        assertDelegate: import("type-mapping").Mapper<unknown, number>;
                    }>;
                };
            };
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, o.SortDirection];
        readonly usedRef: {
            readonly joined1: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: import("type-mapping").Mapper<unknown, number>;
                }>;
            };
        } & {
            readonly table: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: import("type-mapping").Mapper<unknown, number>;
                }>;
            };
        };
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "thisEqual?";
        readonly unaliasedQuery: o.QueryTree;
    }];
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
