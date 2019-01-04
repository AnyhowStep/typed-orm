import * as o from "../../../../dist/src/main";
export declare const entityBannedLog: o.Log<{
    readonly table: o.Table<{
        readonly usedRef: {};
        readonly alias: "entityBanned";
        readonly columns: {
            readonly entityId: o.Column<{
                tableAlias: "entityBanned";
                name: "entityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                    __accepts: string | number | bigint;
                    __canAccept: string | number | bigint;
                };
            }>;
            readonly updatedAt: o.Column<{
                tableAlias: "entityBanned";
                name: "updatedAt";
                assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: Date;
                };
            }>;
            readonly banned: o.Column<{
                tableAlias: "entityBanned";
                name: "banned";
                assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                    __accepts: boolean | 0 | 1 | "0" | "1";
                    __canAccept: boolean | 0 | 1 | "0" | "1";
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: ("entityId" | "updatedAt")[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: "updatedAt"[];
        readonly mutable: ("entityId" | "updatedAt" | "banned")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>;
    readonly entityIdentifier: "entityId"[];
    readonly latestOrder: [o.Column<{
        tableAlias: "entityBanned";
        name: "updatedAt";
        assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
            __accepts: Date;
            __canAccept: Date;
        };
    }>, "DESC"];
    readonly tracked: "banned"[];
    readonly doNotCopy: never[];
    readonly copy: never[];
    readonly staticDefaultValue: {
        readonly banned: true;
    };
    readonly dynamicDefaultValueDelegate: (entityIdentifier: {
        readonly entityId: bigint;
    }, connection: o.IConnection) => Promise<{} & {}>;
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
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                        __accepts: string | number | bigint;
                        __canAccept: string | number | bigint;
                    };
                }>;
                readonly updatedAt: o.Column<{
                    tableAlias: "entityBanned";
                    name: "updatedAt";
                    assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: Date;
                    };
                }>;
                readonly banned: o.Column<{
                    tableAlias: "entityBanned";
                    name: "banned";
                    assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                        __accepts: boolean | 0 | 1 | "0" | "1";
                        __canAccept: boolean | 0 | 1 | "0" | "1";
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: ("entityId" | "updatedAt")[][];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: "updatedAt"[];
            readonly mutable: ("entityId" | "updatedAt" | "banned")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly entityId: o.Column<{
                tableAlias: "entityBanned";
                name: "entityId";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                    __accepts: string | number | bigint;
                    __canAccept: string | number | bigint;
                };
            }>;
            readonly updatedAt: o.Column<{
                tableAlias: "entityBanned";
                name: "updatedAt";
                assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: Date;
                };
            }>;
            readonly banned: o.Column<{
                tableAlias: "entityBanned";
                name: "banned";
                assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                    __accepts: boolean | 0 | 1 | "0" | "1";
                    __canAccept: boolean | 0 | 1 | "0" | "1";
                };
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
} | undefined>;
