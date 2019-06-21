import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: undefined;
    readonly _parentJoins: undefined;
    readonly _selects: [{
        readonly queryTree: o.QueryTree;
        asc(): [{
            usedRef: {} & {};
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, "ASC"];
        desc(): [{
            usedRef: {} & {};
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, "DESC"];
        sort(sortDirection: o.SortDirection): [{
            usedRef: {} & {};
            assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        } & {
            queryTree: o.QueryTree;
        }, o.SortDirection];
        readonly usedRef: {} & {};
        readonly assertDelegate: import("type-mapping").Mapper<unknown, boolean>;
        readonly tableAlias: "__aliased";
        readonly alias: "value";
        readonly unaliasedQuery: o.QueryTree;
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
