import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
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
    }>[];
    readonly _parentJoins: undefined;
    readonly _selects: [o.Expr<{
        readonly usedColumns: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>[];
        readonly assertDelegate: sd.AssertDelegate<boolean>;
    }> & o.IExprSelectItem<{
        readonly usedColumns: o.Column<{
            tableAlias: "table";
            name: "x";
            assertDelegate: sd.AssertDelegate<number>;
        }>[];
        readonly assertDelegate: sd.AssertDelegate<boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "eq";
    }>, o.IExprSelectItem<{
        readonly usedColumns: o.Column<{
            tableAlias: "table";
            name: "z";
            assertDelegate: sd.AssertDelegate<boolean>;
        }>[];
        readonly assertDelegate: sd.AssertDelegate<boolean>;
        readonly tableAlias: "table";
        readonly alias: "test";
    }>];
    readonly _where: undefined;
    readonly _grouped: undefined;
    readonly _having: o.IExpr<{
        usedColumns: o.IColumn<o.ColumnData>[];
        assertDelegate: sd.AssertDelegate<boolean>;
    }>;
    readonly _orders: undefined;
    readonly _limit: undefined;
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: undefined;
}>;
