import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: o.Join<{
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
                readonly w: o.Column<{
                    tableAlias: "table";
                    name: "w";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("x" | "y" | "z" | "w")[];
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
            readonly w: o.Column<{
                tableAlias: "table";
                name: "w";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
        };
        nullable: false;
    }>[];
    readonly _parentJoins: undefined;
    readonly _selects: [o.IExprSelectItem<{
        readonly usedRef: {
            readonly table: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
            } & {
                readonly w: o.Column<{
                    tableAlias: "table";
                    name: "w";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
            };
        } & {};
        readonly assertDelegate: sd.AssertDelegate<boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "equal?";
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
