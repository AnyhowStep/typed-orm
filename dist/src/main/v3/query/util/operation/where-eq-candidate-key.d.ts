import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { IAnonymousTypedExpr } from "../../../expr";
import { ITable, Table } from "../../../table";
export declare type WhereEqCandidateKey<QueryT extends AfterFromClause> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: IAnonymousTypedExpr<boolean>;
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare function whereEqCandidateKey<QueryT extends AfterFromClause, TableT extends ITable>(query: QueryT, table: TableT & QueryT["_joins"][number]["aliasedTable"], key: Table.CandidateKey<TableT>): WhereEqCandidateKey<QueryT>;
//# sourceMappingURL=where-eq-candidate-key.d.ts.map