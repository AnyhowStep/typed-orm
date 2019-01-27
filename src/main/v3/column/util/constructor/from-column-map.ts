import {ColumnMap} from "../../../column-map";
import {IColumn} from "../../column";

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    (
        //Unfortunately, {} & ColumnRef extends ColumnMap
        ColumnMapT[keyof ColumnMapT] extends IColumn ?
        ColumnMapT[Extract<keyof ColumnMapT, string>] :
        never
    ) :
    never
);