import {ColumnMap} from "../../column-map";
import {LeftIntersect, leftIntersect} from "./left-intersect";

export type Intersect<
    ColumnMapA extends ColumnMap,
    ColumnMapB extends ColumnMap,
> = (
    LeftIntersect<ColumnMapA, ColumnMapB> &
    {
        readonly [columnName in Exclude<
            Extract<keyof ColumnMapB, string>,
            keyof ColumnMapA
        >] : (
            ColumnMapB[columnName]
        )
    }
);
export function intersect<
    ColumnMapA extends ColumnMap,
    ColumnMapB extends ColumnMap,
> (
    columnMapA : ColumnMapA,
    columnMapB : ColumnMapB
) : (
    Intersect<ColumnMapA, ColumnMapB>
) {
    const left : LeftIntersect<
        ColumnMapA, ColumnMapB
    > = leftIntersect(columnMapA, columnMapB);

    const right : ColumnMap = {};
    for (let columnName in columnMapB) {
        if (columnMapA.hasOwnProperty(columnName)) {
            continue;
        }
        right[columnName] = columnMapB[columnName];
    }

    return {
        ...left,
        ...right,
    } as Intersect<ColumnMapA, ColumnMapB>;
}