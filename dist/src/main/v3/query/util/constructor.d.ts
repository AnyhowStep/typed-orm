import { Query } from "../query";
export declare type NewInstance = Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: undefined;
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
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
export declare function newInstance(): NewInstance;
