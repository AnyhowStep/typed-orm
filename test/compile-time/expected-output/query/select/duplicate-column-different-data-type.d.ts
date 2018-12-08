import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const query: any;
export declare const query2: any;
export declare const query3: any;
export declare const query4: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: (o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "table";
            readonly name: "table";
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
        nullable: true;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "table3";
            readonly name: "table3";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "table3";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number | null> & {
                        __accepts: number | null;
                        __canAccept: number | null;
                    };
                }>;
                readonly y: o.Column<{
                    tableAlias: "table3";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
                readonly z: o.Column<{
                    tableAlias: "table3";
                    name: "z";
                    assertDelegate: sd.AssertDelegate<boolean> & {
                        __accepts: boolean;
                        __canAccept: boolean;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: "x"[];
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
                tableAlias: "table3";
                name: "x";
                assertDelegate: sd.AssertDelegate<number | null> & {
                    __accepts: number | null;
                    __canAccept: number | null;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "table3";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly z: o.Column<{
                tableAlias: "table3";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: [o.Column<{
        readonly tableAlias: "table";
        readonly name: "x";
        readonly assertDelegate: sd.AssertDelegate<number | null>;
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
