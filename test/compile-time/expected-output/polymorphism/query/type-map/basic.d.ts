import * as o from "../../../../../../dist/src/main";
export declare const parent: o.Table<{
    readonly usedRef: {};
    readonly alias: "parent";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "parent";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, bigint>;
        }>;
        readonly y: o.Column<{
            tableAlias: "parent";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        }>;
        readonly z: o.Column<{
            tableAlias: "parent";
            name: "z";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z")[];
    readonly parents: o.Table<{
        readonly usedRef: {};
        readonly alias: "parent2";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "parent2";
                name: "x";
                assertDelegate: import("type-mapping").Mapper<unknown, bigint>;
            }>;
            readonly y: o.Column<{
                tableAlias: "parent2";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly w: o.Column<{
                tableAlias: "parent2";
                name: "w";
                assertDelegate: import("type-mapping").Mapper<unknown, true>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: "x"[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("x" | "y" | "w")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>[];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const t2: o.Table<{
    readonly usedRef: {};
    readonly alias: "table";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: import("type-mapping").Mapper<unknown, 3n>;
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
        readonly w: o.Column<{
            tableAlias: "table";
            name: "w";
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: ("x" | "y" | "z" | "w")[];
    readonly parents: (o.Table<{
        readonly usedRef: {};
        readonly alias: "parent2";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "parent2";
                name: "x";
                assertDelegate: import("type-mapping").Mapper<unknown, bigint>;
            }>;
            readonly y: o.Column<{
                tableAlias: "parent2";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly w: o.Column<{
                tableAlias: "parent2";
                name: "w";
                assertDelegate: import("type-mapping").Mapper<unknown, true>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: "x"[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("x" | "y" | "w")[];
        readonly parents: [];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }> | o.Table<{
        readonly usedRef: {};
        readonly alias: "parent";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "parent";
                name: "x";
                assertDelegate: import("type-mapping").Mapper<unknown, bigint>;
            }>;
            readonly y: o.Column<{
                tableAlias: "parent";
                name: "y";
                assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
            readonly z: o.Column<{
                tableAlias: "parent";
                name: "z";
                assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: "x"[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: ("x" | "y" | "z")[];
        readonly parents: o.Table<{
            readonly usedRef: {};
            readonly alias: "parent2";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "parent2";
                    name: "x";
                    assertDelegate: import("type-mapping").Mapper<unknown, bigint>;
                }>;
                readonly y: o.Column<{
                    tableAlias: "parent2";
                    name: "y";
                    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
                }>;
                readonly w: o.Column<{
                    tableAlias: "parent2";
                    name: "w";
                    assertDelegate: import("type-mapping").Mapper<unknown, true>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: "x"[][];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("x" | "y" | "w")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>[];
        readonly insertAllowed: true;
        readonly deleteAllowed: true;
    }>)[];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>;
export declare const tm: import("type-mapping").Mapper<unknown, {
    x: 3n;
    y: Date;
    z: boolean;
    w: boolean;
}>;
export declare const tm2: import("type-mapping").Mapper<unknown, {
    x: bigint;
    y: Date;
    w: true;
}>;
export declare const tm3: import("type-mapping").Mapper<unknown, {
    x: bigint;
    y: Date;
    z: boolean;
    w: true;
}>;
export declare const tm4: import("type-mapping").Mapper<unknown, {
    x: 3n;
    y: Date;
    z: boolean;
    w: true;
}>;
