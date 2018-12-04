import {ColumnMap} from "../column-map";
import {IColumn, ColumnUtil} from "../../column";
import {ColumnIdentifier, ColumnIdentifierUtil} from "../../column-identifier";

export function isColumnMap (raw : any) : raw is ColumnMap {
    if (!(raw instanceof Object)) {
        return false;
    }
    for (let columnName in raw) {
        const column = raw[columnName];
        if (!ColumnUtil.isColumn(column)) {
            return false;
        }
    }
    return true;
}
//HasOneColumn<ColumnMapT> extends true ?
//    true :
//    false
export type HasOneColumn<ColumnMapT extends ColumnMap> = (
    Extract<keyof ColumnMapT, string> extends never ?
    //Has zero columns
    false :
    string extends Extract<keyof ColumnMapT, string> ?
    //May have zero, one, or more columns
    boolean :
    (
        {
            [columnName in Extract<keyof ColumnMapT, string>] : (
                Exclude<
                    Extract<keyof ColumnMapT, string>,
                    columnName
                >
            )
        }[Extract<keyof ColumnMapT, string>]
    ) extends never ?
    //Has one column
    true :
    //Has more than one column
    false
);
export function hasOneColumn<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : HasOneColumn<ColumnMapT> {
    return (Object.keys(columnMap).length == 1) as HasOneColumn<ColumnMapT>;
}
export type HasColumn<
    ColumnMapT extends ColumnMap,
    ColumnT extends IColumn
> = (
    keyof ColumnMapT extends never ?
    false :
    ColumnMap extends ColumnMapT ?
    boolean :
    string extends ColumnT["name"] ?
    (
        string extends ColumnT["tableAlias"] ?
        (
            //No run-time check for this
            ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnUtil.FromColumnMap<ColumnMapT>["assertDelegate"]> ?
            boolean :
            false
        ) :
        ColumnT["tableAlias"] extends ColumnUtil.FromColumnMap<ColumnMapT>["tableAlias"] ?
        (
            //No run-time check for this
            ReturnType<ColumnT["assertDelegate"]> extends ReturnType<{
                [columnName in Extract<keyof ColumnMapT, string>] : (
                    ColumnT["tableAlias"] extends ColumnMapT[columnName]["tableAlias"] ?
                    ColumnMapT[columnName]["assertDelegate"] :
                    never
                )
            }[Extract<keyof ColumnMapT, string>]> ?
            boolean :
            false
        ) :
        false
    ) :
    ColumnT["name"] extends keyof ColumnMapT ?
    (
        string extends ColumnT["tableAlias"] ?
        (
            //No run-time check for this
            ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ?
            boolean :
            false
        ) :
        ColumnT["tableAlias"] extends ColumnMapT[ColumnT["name"]]["tableAlias"] ?
        (
            ColumnT["name"] extends ColumnMapT[ColumnT["name"]]["name"] ?
            (
                //No run-time check for this
                ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ?
                true :
                false
            ) :
            false
        ) :
        false
    ) :
    false
);
export type HasColumnIdentifier<
    ColumnMapT extends ColumnMap,
    ColumnIdentifierT extends ColumnIdentifier
> = (
    keyof ColumnMapT extends never ?
    false :
    ColumnMap extends ColumnMapT ?
    boolean :
    string extends ColumnIdentifierT["name"] ?
    (
        string extends ColumnIdentifierT["tableAlias"] ?
        boolean :
        ColumnIdentifierT["tableAlias"] extends ColumnUtil.FromColumnMap<ColumnMapT>["tableAlias"] ?
        boolean :
        false
    ) :
    ColumnIdentifierT["name"] extends keyof ColumnMapT ?
    (
        string extends ColumnIdentifierT["tableAlias"] ?
        boolean :
        ColumnIdentifierT["tableAlias"] extends ColumnMapT[ColumnIdentifierT["name"]]["tableAlias"] ?
        (
            ColumnIdentifierT["name"] extends ColumnMapT[ColumnIdentifierT["name"]]["name"] ?
            true :
            false
        ) :
        false
    ) :
    false
);
export function hasColumnIdentifier<
    ColumnMapT extends ColumnMap,
    ColumnIdentifierT extends ColumnIdentifier
> (columnMap : ColumnMapT, columnIdentifier : ColumnIdentifierT) : (
    HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>
) {
    const column = columnMap[columnIdentifier.name];
    if (!ColumnUtil.isColumn(column)) {
        return false as HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>;
    }
    return ColumnIdentifierUtil.isEqual(
        column,
        columnIdentifier
    ) as HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>;
}
export function assertHasColumnIdentifier (columnMap : ColumnMap, columnIdentifier : ColumnIdentifier) {
    if (!hasColumnIdentifier(columnMap, columnIdentifier)) {
        throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column map`);
    }
}
export function assertHasColumnIdentifiers (columnMap : ColumnMap, columnIdentifiers : ColumnIdentifier[]) {
    for (let columnIdentifier of columnIdentifiers) {
        assertHasColumnIdentifier(columnMap, columnIdentifier);
    }
}
/*
    Checks if all of A's columns are assignable to
    the corresponding columns in B
*/
export type IsAssignableSubset<A extends ColumnMap, B extends ColumnMap> = (
    Extract<keyof A, string> extends never ?
    true :
    string extends Extract<keyof A, string> ?
    boolean :
    string extends Extract<keyof B, string> ?
    boolean :
    Extract<keyof A, string> extends Extract<keyof B, string> ?
    (
        {
            [columnName in Extract<keyof A, string>] : (
                ColumnUtil.IsAssignableTo<
                    A[columnName],
                    B[columnName]
                >
            )
        }[Extract<keyof A, string>]
    ) :
    false
);