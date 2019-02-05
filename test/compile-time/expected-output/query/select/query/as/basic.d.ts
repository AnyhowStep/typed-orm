import * as sd from "schema-decorator";
import * as o from "../../../../../../../dist/src/main";
export declare const selectItem: o.IAliasedTable<{
    usedRef: {};
    alias: "test";
    columns: {
        readonly x: o.Column<{
            readonly tableAlias: "test";
            readonly name: "x";
            readonly assertDelegate: sd.AssertDelegate<number>;
        }>;
    };
}> & {
    assertDelegate: sd.AssertDelegate<number | null>;
    tableAlias: "__aliased";
    asc: () => [{
        usedRef: {};
        assertDelegate: sd.AssertDelegate<number | null>;
        queryTree: o.QueryTree;
    }, "ASC"];
    desc: () => [{
        usedRef: {};
        assertDelegate: sd.AssertDelegate<number | null>;
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
            readonly x: o.Column<{
                readonly tableAlias: "test";
                readonly name: "x";
                readonly assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
    }> & {
        assertDelegate: sd.AssertDelegate<number | null>;
        tableAlias: "__aliased";
        asc: () => [{
            usedRef: {};
            assertDelegate: sd.AssertDelegate<number | null>;
            queryTree: o.QueryTree;
        }, "ASC"];
        desc: () => [{
            usedRef: {};
            assertDelegate: sd.AssertDelegate<number | null>;
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
