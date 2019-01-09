import { IColumn } from "../../../column";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnMap, ColumnMapUtil } from "../../../column-map";
import { SelectItem } from "../../../select-item";
import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { Writable } from "../../../type";
import { ColumnRef, ColumnRefUtil } from "../../../column-ref";
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
export declare type FromSelectItemArray_ColumnRefElement<ColumnRefT extends ColumnRef> = ({
    readonly [tableAlias in ColumnRefUtil.TableAlias<ColumnRefT>]: {
        readonly [columnName in ColumnRefUtil.FindWithTableAlias<ColumnRefT, tableAlias>["name"]]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    };
});
export declare type FromSelectItemArray<ArrT extends SelectItem[]> = (ArrT[number] extends never ? {} : (FromSelectItemArray_ColumnElement<Extract<ArrT[number], IColumn>> & FromSelectItemArray_ExprSelectItemElement<Extract<ArrT[number], IExprSelectItem>> & FromSelectItemArray_ColumnMapElement<Extract<ArrT[number], ColumnMap>> & FromSelectItemArray_ColumnRefElement<Extract<ArrT[number], ColumnRef>>));
export declare function appendSelectItemArray(ref: Writable<ColumnIdentifierRef>, arr: SelectItem[]): Writable<ColumnIdentifierRef>;
export declare function fromSelectItemArray<ArrT extends SelectItem[]>(arr: ArrT): FromSelectItemArray<ArrT>;
//# sourceMappingURL=from-select-item-array.d.ts.map