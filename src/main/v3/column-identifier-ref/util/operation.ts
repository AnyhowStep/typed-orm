import {ColumnIdentifierRef} from "../column-identifier-ref";

//HasOneTable<ColumnRefT> extends true ?
//    true :
//    false
export type HasOneTable<ColumnRefT extends ColumnIdentifierRef> = (
    Extract<keyof ColumnRefT, string> extends never ?
    //Has zero tables
    false :
    string extends Extract<keyof ColumnRefT, string> ?
    //May have zero, one, or more table
    boolean :
    (
        {
            [tableAlias in Extract<keyof ColumnRefT, string>] : (
                Exclude<
                    Extract<keyof ColumnRefT, string>,
                    tableAlias
                >
            )
        }[Extract<keyof ColumnRefT, string>]
    ) extends never ?
    //Has one table
    true :
    //Has more than one table
    false
);
export function hasOneTable<ColumnRefT extends ColumnIdentifierRef> (
    columnRef : ColumnRefT
) : HasOneTable<ColumnRefT> {
    return (Object.keys(columnRef).length == 1) as HasOneTable<ColumnRefT>;
}
export type ToConvenient<ColumnRefT extends ColumnIdentifierRef> = (
    HasOneTable<ColumnRefT> extends true ?
    //Gives us a ColumnIdentifierMap
    ColumnRefT[Extract<keyof ColumnRefT, string>] :
    //Gives us a ColumnIdentifierRef
    ColumnRefT
);
export function toConvenient<ColumnRefT extends ColumnIdentifierRef> (
    columnRef : ColumnRefT
) : ToConvenient<ColumnRefT> {
    const keys = Object.keys(columnRef) as Extract<keyof ColumnRefT, string>[];
    if (keys.length == 1) {
        const result : ColumnRefT[Extract<keyof ColumnRefT, string>] = columnRef[keys[0]];
        return result as any;
    } else {
        return columnRef as any;
    }
}