import {IColumn} from "../../column";
import {ColumnIdentifierMapUtil} from "../../column-identifier-map";
import {IExprSelectItem} from "../../expr-select-item";
import {ColumnMap} from "../../column-map";
import {ColumnIdentifierUtil} from "../../column-identifier";
import {SelectItem} from "../../select-item";
import {IJoin} from "../../join";
import { IQuery } from "../../query";

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly [tableAlias in ColumnT["tableAlias"]] : (
            ColumnIdentifierMapUtil.FromColumn<ColumnT>
        )
    } :
    never
);
export type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (
    ExprSelectItemT extends IExprSelectItem ?
    {
        readonly [tableAlias in ExprSelectItemT["tableAlias"]] : (
            ColumnIdentifierMapUtil.FromExprSelectItem<ExprSelectItemT>
        )
    } :
    never
);
export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    {
        readonly [tableAlias in ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"]] : (
            {
                readonly [columnName in Extract<
                    ColumnMapT[Extract<keyof ColumnMapT, string>],
                    { tableAlias : tableAlias }
                >["name"]] : (
                    ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>
                )
            }
        )
    } :
    never
);
export type FromSelectItem<SelectItemT extends SelectItem> = (
    SelectItemT extends IColumn ?
    FromColumn<SelectItemT> :
    SelectItemT extends IExprSelectItem ?
    FromExprSelectItem<SelectItemT> :
    SelectItemT extends ColumnMap ?
    FromColumnMap<SelectItemT> :
    never
);

export type FromSelectItemArray_ColumnElement<ColumnT extends IColumn> = (
    {
        readonly [tableAlias in ColumnT["tableAlias"]] : {
            readonly [columnName in ColumnT["name"]] : (
                {
                    readonly tableAlias : tableAlias,
                    readonly name : columnName,
                }
            )
        }
    }
);
export type FromSelectItemArray_ExprSelectItemElement<ExprSelectItemT extends IExprSelectItem> = (
    {
        readonly [tableAlias in ExprSelectItemT["tableAlias"]] : {
            readonly [columnName in ExprSelectItemT["alias"]] : (
                {
                    readonly tableAlias : tableAlias,
                    readonly name : columnName,
                }
            )
        }
    }
);
export type FromSelectItemArray_ColumnMapElement<ColumnMapT extends ColumnMap> = (
    {
        readonly [tableAlias in ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"]] : {
            readonly [columnName in Extract<
                ColumnMapT[Extract<keyof ColumnMapT, string>],
                { tableAlias : tableAlias }
            >["name"]] : (
                {
                    readonly tableAlias : tableAlias,
                    readonly name : columnName,
                }
            )
        }
    }
);
export type FromSelectItemArray<ArrT extends SelectItem[]> = (
    ArrT[number] extends never ?
    {} :
    (
        FromSelectItemArray_ColumnElement<
            Extract<ArrT[number], IColumn>
        > &
        FromSelectItemArray_ExprSelectItemElement<
            Extract<ArrT[number], IExprSelectItem>
        > &
        FromSelectItemArray_ColumnMapElement<
            Extract<ArrT[number], ColumnMap>
        >
    )
);

export type FromJoinArray<ArrT extends IJoin[]> = (
    ArrT[number] extends never ?
    {} :
    FromSelectItemArray_ColumnMapElement<
        ArrT[number]["columns"]
    >
);

export type FromQuery<ArrT extends IQuery> = (
    (
        ArrT["_selects"] extends SelectItem[] ?
        FromSelectItemArray<ArrT["_selects"]> :
        {}
    ) &
    (
        ArrT["_joins"] extends IJoin[] ?
        FromJoinArray<ArrT["_joins"]> :
        {}
    )
);