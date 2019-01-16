import {IJoin} from "../../../join";
import * as operation from "../../operation";
import {IColumn} from "../../../../column";

export type ReplaceColumn<
    JoinsT extends IJoin[],
    ColumnT extends IColumn
> = (
    operation.ReplaceColumn<JoinsT[number], ColumnT>[]
);
export function replaceColumn<
    JoinsT extends IJoin[],
    ColumnT extends IColumn
> (
    joins : JoinsT,
    column : ColumnT
) : ReplaceColumn<JoinsT, ColumnT> {
    return joins.map(
        join => operation.replaceColumn<
            JoinsT[number],
            ColumnT
        >(join, column)
    );
}