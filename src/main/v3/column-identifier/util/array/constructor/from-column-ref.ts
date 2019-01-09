import {ColumnIdentifier} from "../../../column-identifier";
import * as Ctor from "../../constructor";
import {ColumnRef} from "../../../../column-ref";
import {fromColumnMap} from "./from-column-map";

export type FromColumnRef<ColumnRefT extends ColumnRef> = (
    Ctor.FromColumnRef<ColumnRefT>[]
);
export function fromColumnRef<ColumnRefT extends ColumnRef> (
    columnRef : ColumnRefT
) : FromColumnRef<ColumnRefT> {
    const result : ColumnIdentifier[] = [];
    for (let tableAlias in columnRef) {
        result.push(...fromColumnMap(
            columnRef[tableAlias]
        ));
    }
    return result as FromColumnRef<ColumnRefT>;
}