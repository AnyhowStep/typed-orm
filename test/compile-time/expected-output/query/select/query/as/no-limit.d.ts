import * as o from "../../../../../../../dist/src/main";
export declare const selectItem: o.IAliasedTable<{
    usedRef: {};
    alias: "test";
    columns: {
        readonly now: o.Column<{
            readonly tableAlias: "test";
            readonly name: "now";
            readonly assertDelegate: import("schema-decorator").AssertDelegate<o.MySqlDateTime> & {
                __accepts: string | Date | o.MySqlDateTime;
                __canAccept: string | Date | o.MySqlDateTime;
            };
        }>;
    };
}> & {
    assertDelegate: import("schema-decorator").AssertDelegate<o.MySqlDateTime>;
    tableAlias: "__aliased";
};
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: undefined;
    readonly _parentJoins: undefined;
    readonly _selects: [o.IAliasedTable<{
        usedRef: {};
        alias: "test";
        columns: {
            readonly now: o.Column<{
                readonly tableAlias: "test";
                readonly name: "now";
                readonly assertDelegate: import("schema-decorator").AssertDelegate<o.MySqlDateTime> & {
                    __accepts: string | Date | o.MySqlDateTime;
                    __canAccept: string | Date | o.MySqlDateTime;
                };
            }>;
        };
    }> & {
        assertDelegate: import("schema-decorator").AssertDelegate<o.MySqlDateTime>;
        tableAlias: "__aliased";
    }];
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
export declare const y: "y";
