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
            readonly alias: "table2";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "table2";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
                readonly y: o.Column<{
                    tableAlias: "table2";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string>;
                }>;
                readonly z: o.Column<{
                    tableAlias: "table2";
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
                tableAlias: "table2";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly y: o.Column<{
                tableAlias: "table2";
                name: "y";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
            readonly z: o.Column<{
                tableAlias: "table2";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: [{
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
    }, {
        readonly x: o.Column<{
            tableAlias: "table2";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "table2";
            name: "y";
            assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly z: o.Column<{
            tableAlias: "table2";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean>;
        }>;
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
export declare const ref: {} & {} & {
    readonly table: {
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
    readonly table2: {
        readonly x: o.Column<{
            tableAlias: "table2";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>;
        readonly y: o.Column<{
            tableAlias: "table2";
            name: "y";
            assertDelegate: sd.AssertDelegate<string>;
        }>;
        readonly z: o.Column<{
            tableAlias: "table2";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean>;
        }>;
    };
} & {};
