import * as o from "../../../../dist/src/main";
export declare const appPlatform: o.Table<{
    readonly usedColumns: never[];
    readonly alias: "appPlatform";
    readonly columns: {} & {
        readonly appId: o.Column<{
            tableAlias: "appPlatform";
            name: "appId";
            assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
        }>;
        readonly platformId: o.Column<{
            tableAlias: "appPlatform";
            name: "platformId";
            assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
        }>;
        readonly createdAt: o.Column<{
            tableAlias: "appPlatform";
            name: "createdAt";
            assertDelegate: import("schema-decorator").AssertDelegate<Date>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: ("appId" | "platformId")[];
    readonly candidateKeys: ("appId" | "platformId")[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: "createdAt"[];
    readonly mutable: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const q: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "appPlatform";
            readonly columns: {} & {
                readonly appId: o.Column<{
                    tableAlias: "appPlatform";
                    name: "appId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
                readonly platformId: o.Column<{
                    tableAlias: "appPlatform";
                    name: "platformId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
                readonly createdAt: o.Column<{
                    tableAlias: "appPlatform";
                    name: "createdAt";
                    assertDelegate: import("schema-decorator").AssertDelegate<Date>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: ("appId" | "platformId")[];
            readonly candidateKeys: ("appId" | "platformId")[][];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: "createdAt"[];
            readonly mutable: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {} & {
            readonly appId: o.Column<{
                tableAlias: "appPlatform";
                name: "appId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
            readonly platformId: o.Column<{
                tableAlias: "appPlatform";
                name: "platformId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
            readonly createdAt: o.Column<{
                tableAlias: "appPlatform";
                name: "createdAt";
                assertDelegate: import("schema-decorator").AssertDelegate<Date>;
            }>;
        };
        nullable: false;
    }>[];
    readonly _parentJoins: undefined;
    readonly _selects: [{} & {
        readonly appId: o.Column<{
            tableAlias: "appPlatform";
            name: "appId";
            assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
        }>;
        readonly platformId: o.Column<{
            tableAlias: "appPlatform";
            name: "platformId";
            assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
        }>;
        readonly createdAt: o.Column<{
            tableAlias: "appPlatform";
            name: "createdAt";
            assertDelegate: import("schema-decorator").AssertDelegate<Date>;
        }>;
    }];
    readonly _where: undefined;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: [o.SortExpr, o.SortDirection][];
    readonly _limit: undefined;
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: undefined;
}>;
