import {IColumn} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {ColumnIdentifierUtil} from "../../../column-identifier";
import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {Writable} from  "../../../type";

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly [tableAlias in ColumnT["tableAlias"]] : (
            ColumnIdentifierMapUtil.FromColumn<ColumnT>
        )
    } :
    never
);
export function appendColumn (
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