import {ColumnIdentifier} from "../../../column-identifier";
import * as Ctor from "../../constructor";
import {ColumnMap} from "../../../../column-map";

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    Ctor.FromColumnMap<ColumnMapT>[] :
    never
);
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    const result : ColumnIdentifier[] = [];
    for (let columnName in columnMap) {
        result.push(Ctor.fromColumn(
            columnMap[columnName]
        ));
    }
    return result as FromColumnMap<ColumnMapT>;
}