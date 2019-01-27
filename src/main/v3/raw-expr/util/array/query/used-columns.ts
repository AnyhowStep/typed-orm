import {IColumn} from "../../../../column";
import {RawExpr} from "../../../raw-expr";
import * as query from "../../query";

export type UsedColumns<ArrT extends RawExpr<any>[]> = (
    (
        query.UsedColumns<ArrT[number]>[number]
    )[]
);
export function usedColumns<ArrT extends RawExpr<any>[]> (
    arr : ArrT
) : UsedColumns<ArrT> {
    const result : IColumn[] = [];
    for (let rawExpr of arr) {
        result.push(...query.usedColumns(rawExpr));
    }
    return result as UsedColumns<ArrT>;
}