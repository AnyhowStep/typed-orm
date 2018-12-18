import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: undefined;
    readonly _parentJoins: undefined;
    readonly _selects: [o.IExprSelectItem<{
        readonly usedRef: {};
        readonly assertDelegate: import("schema-decorator").AssertDelegate<import("../../../../../dist/src/main/v3/data-type").MySqlDateTime> & {
            __accepts: string | Date | import("../../../../../dist/src/main/v3/data-type").MySqlDateTime;
            __canAccept: string | number | Date | import("../../../../../dist/src/main/v3/data-type").MySqlDateTime;
        };
        readonly tableAlias: "__aliased";
        readonly alias: "value";
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
