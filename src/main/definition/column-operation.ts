import * as d from "../declaration";

export function columnToReference<
    TableNameT extends string,
    NameT extends string,
    TypeT
> (column : d.IColumn<TableNameT, NameT, TypeT>) :
    d.ColumnToReference<d.IColumn<TableNameT, NameT, TypeT>>
{
    const result = {
        [column.table] : {
            [column.name] : column
        }
    };
    return result as any;
}

export function nullableColumnNames<RawColumnCollectionT extends d.RawColumnCollection> (
    columns : d.ColumnCollection<any, RawColumnCollectionT>
) : d.NullableColumnNames<RawColumnCollectionT>[] {
    const result : string[] = [];
    for (let name in columns) {
        if (columns.hasOwnProperty(name)) {
            try {
                columns[name].assertDelegate("test-null", null)
                result.push(name);
            } catch (_err) {
                //Do nothing
            }
        }
    }
    return result as any;
}
