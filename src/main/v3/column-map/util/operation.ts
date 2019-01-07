import * as sd from "schema-decorator";
import {ColumnMap} from "../column-map";
import {IColumn, Column, ColumnUtil} from "../../column";
import { Omit } from "../../type";

export type WithTableAlias<
    ColumnMapT extends ColumnMap,
    NewTableAliasT extends string
> = (
    {
        readonly [columnName in Extract<keyof ColumnMapT, string>] : (
            ColumnUtil.WithTableAlias<
                ColumnMapT[columnName],
                NewTableAliasT
            >
        )
    }
);
export function withTableAlias<
    ColumnMapT extends ColumnMap,
    NewTableAliasT extends string
> (
    columnMap : ColumnMapT,
    newTableAlias : NewTableAliasT
) : (
    WithTableAlias<ColumnMapT, NewTableAliasT>
) {
    const result : ColumnMap = {};
    for (let columnName in columnMap) {
        result[columnName] = ColumnUtil.withTableAlias(
            columnMap[columnName],
            newTableAlias
        );
    }
    return result as WithTableAlias<ColumnMapT, NewTableAliasT>;
}
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
export type ToNullable<ColumnMapT extends ColumnMap> = (
    {
        readonly [columnName in keyof ColumnMapT] : (
            ColumnUtil.ToNullable<ColumnMapT[columnName]>
        )
    }
);
export function toNullable<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : ToNullable<ColumnMapT> {
    const result : ColumnMap = {};
    for (let columnName in columnMap) {
        result[columnName] = ColumnUtil.toNullable(columnMap[columnName]);
    }
    return result as ToNullable<ColumnMapT>;
}

export type ToInterface<MapT extends ColumnMap> = (
    {
        readonly [columnName in keyof MapT] : (
            ColumnUtil.ToInterface<MapT[columnName]>
        )
    }
);

export function omit<
    MapT extends ColumnMap,
    ArrT extends string[]
>(
    map : MapT,
    arr : ArrT
) : Omit<MapT, ArrT[number]> {
    const result : any = {};
    for (let columnName in map) {
        if (arr.indexOf(columnName) < 0) {
            result[columnName] = map[columnName];
        }
    }
    return result;
}
export function pick<
    MapT extends ColumnMap,
    ArrT extends string[]
>(
    map : MapT,
    arr : ArrT
) : Pick<MapT, ArrT[number]> {
    const result : any = {};
    for (let columnName in map) {
        if (arr.indexOf(columnName) >= 0) {
            result[columnName] = map[columnName];
        }
    }
    return result;
}