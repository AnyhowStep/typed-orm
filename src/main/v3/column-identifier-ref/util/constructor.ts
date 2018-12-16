import {IColumn, ColumnUtil} from "../../column";
import {ColumnIdentifierMapUtil} from "../../column-identifier-map";
import {IExprSelectItem, ExprSelectItemUtil} from "../../expr-select-item";
import {ColumnMap, ColumnMapUtil} from "../../column-map";
import {ColumnIdentifierUtil} from "../../column-identifier";
import {SelectItem} from "../../select-item";
import {IJoin} from "../../join";
import {IQuery} from "../../query";
import {ColumnIdentifierRef} from "../column-identifier-ref";
import {Writable} from  "../../type";

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly [tableAlias in ColumnT["tableAlias"]] : (
            ColumnIdentifierMapUtil.FromColumn<ColumnT>
        )
    } :
    never
);
function appendColumn (
    ref : Writable<ColumnIdentifierRef>,
    column : IColumn
) {
    let map = ref[column.tableAlias];
    if (map == undefined) {
        map = {};
        ref[column.tableAlias] = map;
    }
    map[column.name] = ColumnIdentifierUtil.fromColumn(column);
    return ref;
}
export type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (
    ExprSelectItemT extends IExprSelectItem ?
    {
        readonly [tableAlias in ExprSelectItemT["tableAlias"]] : (
            ColumnIdentifierMapUtil.FromExprSelectItem<ExprSelectItemT>
        )
    } :
    never
);
function appendExprSelectItem (
    ref : Writable<ColumnIdentifierRef>,
    item : IExprSelectItem
) {
    let map = ref[item.tableAlias];
    if (map == undefined) {
        map = {};
        ref[item.tableAlias] = map;
    }
    map[item.alias] = ColumnIdentifierUtil.fromExprSelectItem(item);
    return ref;
}
export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    {
        readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>] : (
            {
                readonly [columnName in ColumnMapUtil.FindWithTableAlias<
                    ColumnMapT,
                    tableAlias
                >["name"]] : (
                    ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>
                )
            }
        )
    } :
    never
);
function appendColumnMap (
    ref : Writable<ColumnIdentifierRef>,
    columnMap : ColumnMap
) {
    for (let columnName in columnMap) {
        appendColumn(ref, columnMap[columnName]);
    }
    return ref;
}
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    const result = appendColumnMap({}, columnMap);
    return result as FromColumnMap<ColumnMapT>;
}
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
        readonly [tableAlias in ColumnMapUtil.TableAlias<ColumnMapT>] : {
            readonly [columnName in ColumnMapUtil.FindWithTableAlias<
                ColumnMapT,
                tableAlias
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
function appendSelectItem (
    ref : Writable<ColumnIdentifierRef>,
    item : SelectItem
) {
    if (ColumnUtil.isColumn(item)) {
        appendColumn(ref, item);
    } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
        appendExprSelectItem(ref, item);
    } else if (ColumnMapUtil.isColumnMap(item)) {
        appendColumnMap(ref, item);
    } else {
        throw new Error(`Unknown select item`);
    }
    return ref;
}
function appendSelectItemArray(
    ref : Writable<ColumnIdentifierRef>,
    arr : SelectItem[]
) {
    for (let item of arr) {
        appendSelectItem(ref, item);
    }
    return ref;
}
export function fromSelectItemArray<ArrT extends SelectItem[]> (
    arr : ArrT
) : FromSelectItemArray<ArrT> {
    const result : Writable<ColumnIdentifierRef> = {};
    appendSelectItemArray(result, arr);
    return result as FromSelectItemArray<ArrT>;
}
export type FromJoinArray<ArrT extends IJoin[]> = (
    ArrT[number] extends never ?
    {} :
    FromSelectItemArray_ColumnMapElement<
        ArrT[number]["columns"]
    >
);
function appendJoin(
    ref : Writable<ColumnIdentifierRef>,
    join : IJoin
) {
    appendColumnMap(ref, join.columns);
    return ref;
}
function appendJoinArray(
    ref : Writable<ColumnIdentifierRef>,
    arr : IJoin[]
) {
    for (let join of arr) {
        appendJoin(ref, join);
    }
    return ref;
}
export function fromJoinArray<ArrT extends IJoin[]> (
    arr : ArrT
) : FromJoinArray<ArrT> {
    const result : Writable<ColumnIdentifierRef> = {};
    appendJoinArray(result, arr);
    return result as FromJoinArray<ArrT>;
}

export type FromQuery<QueryT extends IQuery> = (
    (
        QueryT["_joins"] extends IJoin[] ?
        FromJoinArray<QueryT["_joins"]> :
        {}
    ) &
    (
        QueryT["_parentJoins"] extends IJoin[] ?
        FromJoinArray<QueryT["_parentJoins"]> :
        {}
    ) &
    (
        QueryT["_selects"] extends SelectItem[] ?
        FromSelectItemArray<QueryT["_selects"]> :
        {}
    )
);
export function fromQuery<QueryT extends IQuery> (
    query : QueryT
) : FromQuery<QueryT> {
    const result : ColumnIdentifierRef = {};
    if (query._joins != undefined) {
        appendJoinArray(result, query._joins);
    }
    if (query._parentJoins != undefined) {
        appendJoinArray(result, query._parentJoins);
    }
    if (query._selects != undefined) {
        appendSelectItemArray(result, query._selects);
    }
    return result as FromQuery<QueryT>;
}