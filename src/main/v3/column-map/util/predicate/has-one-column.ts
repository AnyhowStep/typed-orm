import {ColumnMap} from "../../column-map";

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