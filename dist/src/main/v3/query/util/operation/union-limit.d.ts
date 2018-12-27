import { IQuery, Query, LimitData } from "../../query";
export declare type UnionLimit<QueryT extends IQuery, MaxRowCountT extends number> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: (Extract<QueryT["_unionLimit"] extends LimitData ? {
        readonly maxRowCount: MaxRowCountT;
        readonly offset: QueryT["_unionLimit"]["offset"];
    } : {
        readonly maxRowCount: MaxRowCountT;
        readonly offset: 0;
    }, LimitData>);
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare function unionLimit<QueryT extends IQuery, MaxRowCountT extends number>(query: QueryT, maxRowCount: MaxRowCountT): UnionLimit<QueryT, MaxRowCountT>;
//# sourceMappingURL=union-limit.d.ts.map