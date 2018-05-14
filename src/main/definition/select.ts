import * as d from "../declaration";
import {Column} from "./column";
import {ColumnExpr} from "./expr";
import {replaceColumnOfReference} from "./column-references-operation";

export function replaceColumnOfSelectTuple<
    TupleT extends d.Tuple<d.AnySelectTupleElement>,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> (
    tuple : TupleT,
    newColumn : Column<TableNameT, NameT, NewTypeT>
) : d.ReplaceColumnOfSelectTuple<
    TupleT,
    TableNameT,
    NameT,
    NewTypeT
> {
    return tuple.map((element) => {
        if (element instanceof ColumnExpr) {
            if (element.table == newColumn.table && element.name == newColumn.name) {
                return new ColumnExpr(
                    element.usedReferences,
                    element.table,
                    element.name,
                    newColumn.assertDelegate,
                    //TODO Test if this is correct
                    element.originalQuery
                );
            } else {
                return element;
            }
        } else if (element instanceof Column) {
            if (element.table == newColumn.table && element.name == newColumn.name) {
                return newColumn;
            } else {
                return element;
            }
        } else if (element instanceof Object) {
            let tmp = {
                [newColumn.table] : element
            }
            tmp = replaceColumnOfReference(tmp, newColumn);
            return tmp[newColumn.table];
        } else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
    }) as any;
}
