import { Query } from "../../query";
import { AfterSelectClause } from "../predicate";
import { MapDelegate } from "../../../map-delegate";
import { ColumnRefUtil, ColumnRef } from "../../../column-ref";
import { ColumnMapUtil, ColumnMap } from "../../../column-map";
import { SelectItem } from "../../../select-item";
import { SelectItemArrayUtil } from "../../../select-item-array";
export declare type ToTypeRef<RefT extends ColumnRef> = ({
    readonly [tableAlias in keyof RefT]: {
        readonly [columnName in keyof RefT[tableAlias]]: (ReturnType<RefT[tableAlias][columnName]["assertDelegate"]>);
    };
});
export declare type ToTypeMap<MapT extends ColumnMap> = ({
    readonly [columnName in keyof MapT]: (ReturnType<MapT[columnName]["assertDelegate"]>);
});
export declare type UnmappedType<ArrT extends SelectItem[]> = (SelectItemArrayUtil.HasDuplicateColumnName<ArrT> extends true ? ToTypeRef<ColumnRefUtil.FromSelectItemArray<ArrT>> : ToTypeMap<ColumnMapUtil.FromSelectItemArray<ArrT, "">>);
export declare type MappedType<QueryT extends AfterSelectClause> = (QueryT["_mapDelegate"] extends MapDelegate ? (ReturnType<QueryT["_mapDelegate"]> extends Promise<infer R> ? R : ReturnType<QueryT["_mapDelegate"]>) : UnmappedType<QueryT["_selects"]>);
export declare type Map<QueryT extends AfterSelectClause, DelegateT extends MapDelegate<MappedType<QueryT>, UnmappedType<QueryT["_selects"]>, any>> = (Query<{
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
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: MapDelegate<UnmappedType<QueryT["_selects"]>, UnmappedType<QueryT["_selects"]>, ReturnType<DelegateT> extends Promise<any> ? ReturnType<DelegateT> : Promise<ReturnType<DelegateT>>>;
}>);
export declare function map<QueryT extends AfterSelectClause, DelegateT extends MapDelegate<MappedType<QueryT>, UnmappedType<QueryT["_selects"]>, any>>(query: QueryT, delegate: DelegateT): Map<QueryT, DelegateT>;
//# sourceMappingURL=map.d.ts.map