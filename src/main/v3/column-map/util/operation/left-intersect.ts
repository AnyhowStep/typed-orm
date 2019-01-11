import * as sd from "schema-decorator";
import {ColumnMap} from "../../column-map";
import {IColumn, Column, ColumnUtil} from "../../../column";

//Take the intersection and the "left" columnMap
export type LeftIntersect<
    ColumnMapA extends ColumnMap,
    ColumnMapB extends ColumnMap,
> = (
    {
        readonly [columnName in Extract<keyof ColumnMapA, string>] : (
            columnName extends keyof ColumnMapB ?
            IColumn<{
                readonly tableAlias : ColumnMapA[columnName]["tableAlias"],
                readonly name : ColumnMapA[columnName]["name"],
                readonly assertDelegate : sd.AssertDelegate<
                    ReturnType<ColumnMapA[columnName]["assertDelegate"]> &
                    ReturnType<ColumnMapB[columnName]["assertDelegate"]>
                >
            }> :
            ColumnMapA[columnName]
        )
    }
);
export function leftIntersect<
    ColumnMapA extends ColumnMap,
    ColumnMapB extends ColumnMap,
> (
    columnMapA : ColumnMapA,
    columnMapB : ColumnMapB
) : (
    LeftIntersect<ColumnMapA, ColumnMapB>
) {
    const result : ColumnMap = {};
    for (let columnName in columnMapA) {
        const columnA = columnMapA[columnName];
        const columnB = columnMapB[columnName];
        if (ColumnUtil.isColumn(columnB)) {
            result[columnName] = new Column(
                {
                    tableAlias : columnA.tableAlias,
                    name : columnA.name,
                    assertDelegate : sd.and(
                        columnA.assertDelegate,
                        columnMapB[columnName].assertDelegate
                    ),
                },
                columnA.__isFromExprSelectItem
            );
        } else {
            result[columnName] = columnA;
        }
    }
    return result as LeftIntersect<ColumnMapA, ColumnMapB>;
};