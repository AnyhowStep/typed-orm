import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "table";
            readonly columns: {
                readonly a: o.Column<{
                    tableAlias: "table";
                    name: "a";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
                readonly b: o.Column<{
                    tableAlias: "table";
                    name: "b";
                    assertDelegate: sd.AssertDelegate<string>;
                }>;
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
                readonly c: o.Column<{
                    tableAlias: "table";
                    name: "c";
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
            readonly mutable: ("a" | "b" | "x" | "y" | "z" | "c")[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly a: o.Column<{
                tableAlias: "table";
                name: "a";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
            readonly b: o.Column<{
                tableAlias: "table";
                name: "b";
                assertDelegate: sd.AssertDelegate<string>;
            }>;
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
            readonly c: o.Column<{
                tableAlias: "table";
                name: "c";
                assertDelegate: sd.AssertDelegate<boolean>;
            }>;
        };
        nullable: false;
    }>[];
    readonly _parentJoins: undefined;
    readonly _selects: [o.Column<{
        tableAlias: "table";
        name: "z";
        assertDelegate: sd.AssertDelegate<boolean>;
    }>, o.Column<{
        tableAlias: "table";
        name: "x";
        assertDelegate: sd.AssertDelegate<number>;
    }>, o.Column<{
        tableAlias: "table";
        name: "y";
        assertDelegate: sd.AssertDelegate<string>;
    }>];
    readonly _where: undefined;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: undefined;
    readonly _limit: undefined;
    readonly _unions: o.UnionQuery[];
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: undefined;
}>;
