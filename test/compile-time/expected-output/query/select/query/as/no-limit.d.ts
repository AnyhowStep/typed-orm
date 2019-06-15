import * as o from "../../../../../../../dist/src/main";
export declare const selectItem: o.IAliasedTable<{
    usedRef: {};
    alias: "test";
    columns: {
        readonly now: o.Column<{
            readonly tableAlias: "test";
            readonly name: "now";
            readonly assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        }>;
    };
}> & {
    assertDelegate: import("type-mapping").Mapper<unknown, Date>;
    tableAlias: "__aliased";
    asc: () => [{
        usedRef: {};
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        queryTree: o.QueryTree;
    }, "ASC"];
    desc: () => [{
        usedRef: {};
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        queryTree: o.QueryTree;
    }, "DESC"];
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
                readonly assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            }>;
        };
    }> & {
        assertDelegate: import("type-mapping").Mapper<unknown, Date>;
        tableAlias: "__aliased";
        asc: () => [{
            usedRef: {};
            assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            queryTree: o.QueryTree;
        }, "ASC"];
        desc: () => [{
            usedRef: {};
            assertDelegate: import("type-mapping").Mapper<unknown, Date>;
            queryTree: o.QueryTree;
        }, "DESC"];
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
