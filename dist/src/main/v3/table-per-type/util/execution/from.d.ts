import { ITable } from "../../../table";
import { Query } from "../../../query";
import { IJoin } from "../../../join";
export declare type ToJoin<TableT extends ITable> = (TableT extends ITable ? IJoin<{
    readonly aliasedTable: TableT;
    readonly columns: TableT["columns"];
    readonly nullable: false;
}> : never);
export declare type From<TableT extends ITable> = (Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: ToJoin<TableT | TableT["parents"][number]>[];
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
}>);
export declare function from<TableT extends ITable>(table: TableT): (From<TableT>);
//# sourceMappingURL=from.d.ts.map