import {ColumnCollection} from "./column-collection";
import {Column, AnyColumn, ColumnUtil} from "../column";
import {Tuple, TupleKeys} from "../tuple";

export namespace ColumnCollectionUtil {
    //Types only
    export type Columns<ColumnCollectionT extends ColumnCollection> = (
        ColumnCollectionT[keyof ColumnCollectionT]
    );

    //Types with implementation
    export type HasColumn<
        ColumnCollectionT extends ColumnCollection,
        ColumnT extends AnyColumn
    > = (
        ColumnT["name"] extends keyof ColumnCollectionT ?
            (
                ColumnT["tableAlias"] extends ColumnCollectionT[ColumnT["name"]]["tableAlias"] ?
                    (
                        ColumnT["name"] extends ColumnCollectionT[ColumnT["name"]]["name"] ?
                            (
                                //No run-time check for this
                                ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnCollectionT[ColumnT["name"]]["assertDelegate"]> ?
                                    (true) :
                                    false
                            ) :
                            false
                    ) :
                    false
            ) :
            false
    );
    export function hasColumn<
        ColumnCollectionT extends ColumnCollection,
        ColumnT extends AnyColumn
    > (columnCollection : ColumnCollectionT, other : ColumnT) : (
        HasColumn<ColumnCollectionT, ColumnT>
    ) {
        if (!columnCollection.hasOwnProperty(other.name)) {
            return false as any;
        }
        const column = columnCollection[other.name];
        if (!(column instanceof Column)) {
            return false as any;
        }
        return (
            column.tableAlias == other.tableAlias &&
            column.name == other.name
        ) as any;
    }
    export type HasColumns<
        ColumnCollectionT extends ColumnCollection,
        ColumnT extends Tuple<AnyColumn>
    > = (
        {
            [index in TupleKeys<ColumnT>] : (
                ColumnT[index] extends AnyColumn ?
                    HasColumn<ColumnCollectionT, ColumnT[index]> :
                    never
            )
        }[TupleKeys<ColumnT>]
    );

    export type ToNullable<
        ColumnCollectionT extends ColumnCollection,
    > = (
        {
            readonly [columnName in keyof ColumnCollectionT] : ColumnUtil.ToNullable<ColumnCollectionT[columnName]>
        }
    );
    export function toNullable<
        ColumnCollectionT extends ColumnCollection,
    > (columnCollection : ColumnCollectionT) : (
        ToNullable<ColumnCollectionT>
    ) {
        const result = {} as any;
        for (let columnName in columnCollection) {
            if (!columnCollection.hasOwnProperty(columnName)) {
                continue;
            }
            const column = columnCollection[columnName];
            if (!(column instanceof Column)) {
                continue;
            }
            result[columnName] = ColumnUtil.toNullable(column);
        }
        return result;
    }
}
