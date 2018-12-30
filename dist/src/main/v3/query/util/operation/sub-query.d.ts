import { IQuery, Query } from "../../query";
import { IJoin } from "../../../join";
export declare type SubQueryResult<QueryT extends IQuery> = (Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: undefined;
    readonly _parentJoins: (Extract<QueryT["_joins"], IJoin[]>[number] | Extract<QueryT["_parentJoins"], IJoin[]>[number])[];
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
}>);
export declare function subQuery<QueryT extends IQuery>(query: QueryT): SubQueryResult<QueryT>;
//# sourceMappingURL=sub-query.d.ts.map