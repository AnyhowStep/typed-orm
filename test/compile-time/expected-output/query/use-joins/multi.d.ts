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
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
                readonly y: o.Column<{
                    tableAlias: "table";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
                readonly z: o.Column<{
                    tableAlias: "table";
                    name: "z";
                    assertDelegate: sd.AssertDelegate<boolean> & {
                        __accepts: boolean;
                        __canAccept: boolean;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("x" | "y" | "z")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
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
                    assertDelegate: sd.AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: string | number | Date;
                    };
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
                readonly y: o.Column<{
                    tableAlias: "joined1";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("a" | "b" | "y")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly a: o.Column<{
                tableAlias: "joined1";
                name: "a";
                assertDelegate: sd.AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: string | number | Date;
                };
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "joined1";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedRef: {};
            readonly alias: "joined2";
            readonly columns: {
                readonly n: o.Column<{
                    tableAlias: "joined2";
                    name: "n";
                    assertDelegate: sd.AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: string | number | Date;
                    };
                }>;
                readonly m: o.Column<{
                    tableAlias: "joined2";
                    name: "m";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
                readonly o: o.Column<{
                    tableAlias: "joined2";
                    name: "o";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("n" | "m" | "o")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly n: o.Column<{
                tableAlias: "joined2";
                name: "n";
                assertDelegate: sd.AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: string | number | Date;
                };
            }>;
            readonly m: o.Column<{
                tableAlias: "joined2";
                name: "m";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly o: o.Column<{
                tableAlias: "joined2";
                name: "o";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
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
