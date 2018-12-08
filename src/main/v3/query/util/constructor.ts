import {Query} from "../query";

export type NewInstance = Query<{
    readonly _distinct : false;
    readonly _sqlCalcFoundRows : false;

    readonly _joins : undefined;
    readonly _parentJoins : undefined;
    readonly _selects : undefined;
    readonly _where : undefined;

    readonly _grouped : undefined;
    readonly _having : undefined;

    readonly _orders : undefined;
    readonly _limit : undefined;

    readonly _unions : undefined;
    readonly _unionOrders : undefined;
    readonly _unionLimit : undefined;

    readonly _mapDelegate : undefined;
}>;
export function newInstance () : NewInstance {
    return new Query({
        _distinct : false,
        _sqlCalcFoundRows : false,

        _joins : undefined,
        _parentJoins : undefined,
        _selects : undefined,
        _where : undefined,

        _grouped : undefined,
        _having : undefined,

        _orders : undefined,
        _limit : undefined,

        _unions : undefined,
        _unionOrders : undefined,
        _unionLimit : undefined,

        _mapDelegate : undefined,
    });
}