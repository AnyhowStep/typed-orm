import * as o from "../../../../../../dist/src/main";
export declare const parent: o.Table<{
    readonly usedRef: {};
    readonly alias: "parent";
    readonly columns: {
        readonly x: o.Column<{
            tableAlias: "parent";
            name: "x";
            assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                __accepts: string | number | bigint;
                __canAccept: string | number | bigint;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "parent";
            name: "y";
            assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                __accepts: Date;
                __canAccept: Date;
            };
        }>;
        readonly z: o.Column<{
            tableAlias: "parent";
            name: "z";
            assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                __accepts: boolean | 0 | 1 | "0" | "1";
                __canAccept: boolean | 0 | 1 | "0" | "1";
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: [];
    readonly parents: o.Table<{
        readonly usedRef: {};
        readonly alias: "parent2";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "parent2";
                name: "x";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                    __accepts: string | number | bigint;
                    __canAccept: string | number | bigint;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "parent2";
                name: "y";
                assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: Date;
                };
            }>;
            readonly w: o.Column<{
                tableAlias: "parent2";
                name: "w";
                assertDelegate: import("schema-decorator").AssertDelegate<true> & {
                    __accepts: true;
                    __canAccept: true;
                };
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
            assertDelegate: import("schema-decorator").AssertDelegate<3n> & {
                __accepts: 3n;
                __canAccept: 3n;
            };
        }>;
        readonly y: o.Column<{
            tableAlias: "table";
            name: "y";
            assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                __accepts: Date;
                __canAccept: Date;
            };
        }>;
        readonly z: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                __accepts: boolean | 0 | 1 | "0" | "1";
                __canAccept: boolean | 0 | 1 | "0" | "1";
            };
        }>;
        readonly w: o.Column<{
            tableAlias: "table";
            name: "w";
            assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                __accepts: boolean | 0 | 1 | "0" | "1";
                __canAccept: boolean | 0 | 1 | "0" | "1";
            };
        }>;
    };
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: "x"[][];
    readonly generated: [];
    readonly isNullable: never[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: [];
    readonly parents: (o.Table<{
        readonly usedRef: {};
        readonly alias: "parent2";
        readonly columns: {
            readonly x: o.Column<{
                tableAlias: "parent2";
                name: "x";
                assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                    __accepts: string | number | bigint;
                    __canAccept: string | number | bigint;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "parent2";
                name: "y";
                assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: Date;
                };
            }>;
            readonly w: o.Column<{
                tableAlias: "parent2";
                name: "w";
                assertDelegate: import("schema-decorator").AssertDelegate<true> & {
                    __accepts: true;
                    __canAccept: true;
                };
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
                assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                    __accepts: string | number | bigint;
                    __canAccept: string | number | bigint;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "parent";
                name: "y";
                assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: Date;
                };
            }>;
            readonly z: o.Column<{
                tableAlias: "parent";
                name: "z";
                assertDelegate: import("schema-decorator").AssertDelegate<boolean> & {
                    __accepts: boolean | 0 | 1 | "0" | "1";
                    __canAccept: boolean | 0 | 1 | "0" | "1";
                };
            }>;
        };
        readonly autoIncrement: undefined;
        readonly id: undefined;
        readonly primaryKey: undefined;
        readonly candidateKeys: "x"[][];
        readonly generated: [];
        readonly isNullable: never[];
        readonly hasExplicitDefaultValue: [];
        readonly mutable: [];
        readonly parents: o.Table<{
            readonly usedRef: {};
            readonly alias: "parent2";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "parent2";
                    name: "x";
                    assertDelegate: import("schema-decorator").AssertDelegate<bigint> & {
                        __accepts: string | number | bigint;
                        __canAccept: string | number | bigint;
                    };
                }>;
                readonly y: o.Column<{
                    tableAlias: "parent2";
                    name: "y";
                    assertDelegate: import("schema-decorator").AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: Date;
                    };
                }>;
                readonly w: o.Column<{
                    tableAlias: "parent2";
                    name: "w";
                    assertDelegate: import("schema-decorator").AssertDelegate<true> & {
                        __accepts: true;
                        __canAccept: true;
                    };
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
export declare const tm: import("schema-decorator").AssertDelegate<{
    x: 3n;
    y: Date;
    z: boolean;
    w: boolean;
}>;
export declare const tm2: import("schema-decorator").AssertDelegate<{
    x: bigint;
    y: Date;
    w: true;
}>;
export declare const tm3: import("schema-decorator").AssertDelegate<{
    x: bigint;
    y: Date;
    z: boolean;
    w: true;
}>;
export declare const tm4: import("schema-decorator").AssertDelegate<{
    x: 3n;
    y: Date;
    z: boolean;
    w: true;
}>;
