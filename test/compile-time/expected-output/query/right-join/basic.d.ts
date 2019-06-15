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
        nullable: true;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "joined1";
            readonly columns: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
                }>;
                readonly c: o.Column<{
                    tableAlias: "joined1";
                    name: "c";
                    assertDelegate: import("type-mapping").Mapper<unknown, string>;
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
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
            }>;
            readonly c: o.Column<{
                tableAlias: "joined1";
                name: "c";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
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
export declare const query2: o.Query<{
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
        nullable: true;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "joined1";
            readonly columns: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
                }>;
                readonly c: o.Column<{
                    tableAlias: "joined1";
                    name: "c";
                    assertDelegate: import("type-mapping").Mapper<unknown, string>;
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
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
            }>;
            readonly c: o.Column<{
                tableAlias: "joined1";
                name: "c";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
        };
        nullable: true;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "joined2";
            readonly columns: {
                readonly j: o.Column<{
                    tableAlias: "joined2";
                    name: "j";
                    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
                }>;
                readonly k: o.Column<{
                    tableAlias: "joined2";
                    name: "k";
                    assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
                }>;
                readonly l: o.Column<{
                    tableAlias: "joined2";
                    name: "l";
                    assertDelegate: import("type-mapping").Mapper<unknown, string>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("j" | "k" | "l")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly j: o.Column<{
                tableAlias: "joined2";
                name: "j";
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly k: o.Column<{
                tableAlias: "joined2";
                name: "k";
                assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
            }>;
            readonly l: o.Column<{
                tableAlias: "joined2";
                name: "l";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
        };
        nullable: true;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "joined3";
            readonly columns: {
                readonly d: o.Column<{
                    tableAlias: "joined3";
                    name: "d";
                    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
                }>;
                readonly e: o.Column<{
                    tableAlias: "joined3";
                    name: "e";
                    assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
                }>;
                readonly f: o.Column<{
                    tableAlias: "joined3";
                    name: "f";
                    assertDelegate: import("type-mapping").Mapper<unknown, string>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("d" | "e" | "f")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly d: o.Column<{
                tableAlias: "joined3";
                name: "d";
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly e: o.Column<{
                tableAlias: "joined3";
                name: "e";
                assertDelegate: import("type-mapping").Mapper<unknown, Buffer>;
            }>;
            readonly f: o.Column<{
                tableAlias: "joined3";
                name: "f";
                assertDelegate: import("type-mapping").Mapper<unknown, string>;
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
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
