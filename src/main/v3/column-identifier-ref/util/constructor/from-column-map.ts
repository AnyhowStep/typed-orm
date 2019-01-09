import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {ColumnIdentifierUtil} from "../../../column-identifier";
import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {Writable} from  "../../../type";
import {appendColumn} from "./from-column";

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
export function appendColumnMap (
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