import {ColumnIdentifierUtil} from "../../../column-identifier";
import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {Writable} from  "../../../type";
import {ColumnRef} from "../../../column-ref";
import {appendColumnMap} from "./from-column-map";

export type FromColumnRef<ColumnRefT extends ColumnRef> = (
    ColumnRefT extends ColumnRef ?
    {
        readonly [tableAlias in Extract<keyof ColumnRefT, string>] : (
            {
                readonly [columnName in Extract<keyof ColumnRefT[tableAlias], string>] : (
                    ColumnIdentifierUtil.FromColumn<ColumnRefT[tableAlias][columnName]>
                )
            }
        )
    } :
    never
);
export function appendColumnRef (
    ref : Writable<ColumnIdentifierRef>,
    columnRef : ColumnRef
) {
    for (let tableAlias in columnRef) {
        appendColumnMap(ref, columnRef[tableAlias]);
    }
    return ref;
}
export function fromColumnRef<ColumnRefT extends ColumnRef> (
    columnRef : ColumnRefT
) : FromColumnRef<ColumnRefT> {
    const result = appendColumnRef({}, columnRef);
    return result as FromColumnRef<ColumnRefT>;
}