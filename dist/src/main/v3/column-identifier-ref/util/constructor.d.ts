import { IColumn } from "../../column";
import { ColumnIdentifierMapUtil } from "../../column-identifier-map";
import { IExprSelectItem } from "../../expr-select-item";
import { ColumnMap, ColumnMapUtil } from "../../column-map";
import { ColumnIdentifierUtil } from "../../column-identifier";
import { SelectItem } from "../../select-item";
import { IJoin } from "../../join";
import { IQuery } from "../../query";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly [tableAlias in ColumnT["tableAlias"]]: (ColumnIdentifierMapUtil.FromColumn<ColumnT>);
} : never);
export declare type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
    readonly [tableAlias in ExprSelectItemT["tableAlias"]]: (ColumnIdentifierMapUtil.FromExprSelectItem<ExprSelectItemT>);
} : never);
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? {
    readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>]: ({
        readonly [columnName in ColumnMapUtil.FindWithTableAlias<ColumnMapT, tableAlias>["name"]]: (ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>);
    });
} : never);
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? FromColumn<SelectItemT> : SelectItemT extends IExprSelectItem ? FromExprSelectItem<SelectItemT> : SelectItemT extends ColumnMap ? FromColumnMap<SelectItemT> : never);
export declare type FromSelectItemArray_ColumnElement<ColumnT extends IColumn> = ({
    readonly [tableAlias in ColumnT["tableAlias"]]: {
        readonly [columnName in ColumnT["name"]]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    };
});
export declare type FromSelectItemArray_ExprSelectItemElement<ExprSelectItemT extends IExprSelectItem> = ({
    readonly [tableAlias in ExprSelectItemT["tableAlias"]]: {
        readonly [columnName in ExprSelectItemT["alias"]]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    };
});
export declare type FromSelectItemArray_ColumnMapElement<ColumnMapT extends ColumnMap> = ({
    readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>]: {
        readonly [columnName in ColumnMapUtil.FindWithTableAlias<ColumnMapT, tableAlias>["name"]]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    };
});
export declare type FromSelectItemArray<ArrT extends SelectItem[]> = (ArrT[number] extends never ? {} : (FromSelectItemArray_ColumnElement<Extract<ArrT[number], IColumn>> & FromSelectItemArray_ExprSelectItemElement<Extract<ArrT[number], IExprSelectItem>> & FromSelectItemArray_ColumnMapElement<Extract<ArrT[number], ColumnMap>>));
export declare function fromSelectItemArray<ArrT extends SelectItem[]>(arr: ArrT): FromSelectItemArray<ArrT>;
export declare type FromJoinArray<ArrT extends IJoin[]> = (ArrT[number] extends never ? {} : FromSelectItemArray_ColumnMapElement<ArrT[number]["columns"]>);
export declare function fromJoinArray<ArrT extends IJoin[]>(arr: ArrT): FromJoinArray<ArrT>;
export declare type FromQuery<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoinArray<QueryT["_joins"]> : {}) & (QueryT["_parentJoins"] extends IJoin[] ? FromJoinArray<QueryT["_parentJoins"]> : {}) & (QueryT["_selects"] extends SelectItem[] ? FromSelectItemArray<QueryT["_selects"]> : {}));
export declare function fromQuery<QueryT extends IQuery>(query: QueryT): FromQuery<QueryT>;
//# sourceMappingURL=constructor.d.ts.map