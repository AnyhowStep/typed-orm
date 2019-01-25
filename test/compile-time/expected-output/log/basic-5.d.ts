import * as o from "../../../../dist/src/main";
export declare const entityBannedLog: o.Log<{
    readonly table: o.Table<{
        readonly usedRef: {};
        readonly alias: "entityBanned";
        readonly columns: {
            readonly entityId: o.Column<{
                tableAlias: "entityBanned";
                name: "entityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
            readonly updatedAt: o.Column<{
                tableAlias: "entityBanned";
                name: "updatedAt";
                assertDelegate: import("schema-decorator").AssertDelegate<Date>;
            }>;
            readonly banned: o.Column<{
                tableAlias: "entityBanned";
                name: "banned";
                assertDelegate: import("schema-decorator").AssertDelegate<boolean>;
            }>;
            readonly someOtherEntityId: o.Column<{
                tableAlias: "entityBanned";
                name: "someOtherEntityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: ("entityId" | "updatedAt")[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: "updatedAt"[];
        readonly mutable: ("entityId" | "updatedAt" | "banned" | "someOtherEntityId")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    readonly entity: o.Table<{
        readonly usedRef: {};
        readonly alias: "entity";
        readonly columns: {
            readonly entityId: o.Column<{
                tableAlias: "entity";
                name: "entityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: "entityId"[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: "entityId"[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    readonly entityIdentifier: "entityId"[];
    readonly joinDeclaration: o.JoinDeclaration<{
        fromTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "entityBanned";
            readonly columns: {
                readonly entityId: o.Column<{
                    tableAlias: "entityBanned";
                    name: "entityId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
                readonly updatedAt: o.Column<{
                    tableAlias: "entityBanned";
                    name: "updatedAt";
                    assertDelegate: import("schema-decorator").AssertDelegate<Date>;
                }>;
                readonly banned: o.Column<{
                    tableAlias: "entityBanned";
                    name: "banned";
                    assertDelegate: import("schema-decorator").AssertDelegate<boolean>;
                }>;
                readonly someOtherEntityId: o.Column<{
                    tableAlias: "entityBanned";
                    name: "someOtherEntityId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: ("entityId" | "updatedAt")[][];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: "updatedAt"[];
            readonly mutable: ("entityId" | "updatedAt" | "banned" | "someOtherEntityId")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        toTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "entity";
            readonly columns: {
                readonly entityId: o.Column<{
                    tableAlias: "entity";
                    name: "entityId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: "entityId"[][];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "entityId"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        nullable: false;
    }>;
    readonly latestOrder: [o.Column<{
        tableAlias: "entityBanned";
        name: "updatedAt";
        assertDelegate: import("schema-decorator").AssertDelegate<Date>;
    }>, "DESC"];
    readonly tracked: "banned"[];
    readonly doNotCopy: never[];
    readonly copy: "someOtherEntityId"[];
    readonly copyDefaultsDelegate: (args: {
        entityIdentifier: {
            readonly entityId: bigint;
        };
        connection: o.IConnection;
    }) => Promise<{
        readonly someOtherEntityId: bigint;
    } & {}>;
    readonly trackedDefaults: {
        readonly banned: true;
    };
}>;
export declare const latestQuery: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "entityBanned";
            readonly columns: {
                readonly entityId: o.Column<{
                    tableAlias: "entityBanned";
                    name: "entityId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
                readonly updatedAt: o.Column<{
                    tableAlias: "entityBanned";
                    name: "updatedAt";
                    assertDelegate: import("schema-decorator").AssertDelegate<Date>;
                }>;
                readonly banned: o.Column<{
                    tableAlias: "entityBanned";
                    name: "banned";
                    assertDelegate: import("schema-decorator").AssertDelegate<boolean>;
                }>;
                readonly someOtherEntityId: o.Column<{
                    tableAlias: "entityBanned";
                    name: "someOtherEntityId";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: ("entityId" | "updatedAt")[][];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: "updatedAt"[];
            readonly mutable: ("entityId" | "updatedAt" | "banned" | "someOtherEntityId")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly entityId: o.Column<{
                tableAlias: "entityBanned";
                name: "entityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
            readonly updatedAt: o.Column<{
                tableAlias: "entityBanned";
                name: "updatedAt";
                assertDelegate: import("schema-decorator").AssertDelegate<Date>;
            }>;
            readonly banned: o.Column<{
                tableAlias: "entityBanned";
                name: "banned";
                assertDelegate: import("schema-decorator").AssertDelegate<boolean>;
            }>;
            readonly someOtherEntityId: o.Column<{
                tableAlias: "entityBanned";
                name: "someOtherEntityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint>;
            }>;
        };
        nullable: false;
    }>[];
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
    readonly _where: o.IExpr<{
        usedRef: o.ColumnRef;
        assertDelegate: import("schema-decorator").AssertDelegate<boolean>;
    }>;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: [o.SortExpr, o.SortDirection][];
    readonly _limit: {
        readonly maxRowCount: 1;
        readonly offset: 0;
    };
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: undefined;
}>;
export declare const fetchLatestOrUndefined: Promise<{
    readonly entityId: bigint;
    readonly updatedAt: Date;
    readonly banned: boolean;
    readonly someOtherEntityId: bigint;
} | undefined>;
