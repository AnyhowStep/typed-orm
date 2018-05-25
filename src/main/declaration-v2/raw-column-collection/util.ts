import {RawColumnCollection} from "./raw-column-collection";
import {RawColumnUtil} from "../raw-column";

export namespace RawColumnCollectionUtil {
    export type ToColumnCollection<
        TableAliasT extends string,
        RawT extends RawColumnCollection
    > = (
        {
            readonly [columnName in Extract<keyof RawT, string>]: (
                RawColumnUtil.ToColumn<
                    TableAliasT,
                    columnName,
                    RawT[columnName]
                >
            )
        }
    );
    export function toColumnCollection<
        TableAliasT extends string,
        RawT extends RawColumnCollection
    > (
        tableAlias : TableAliasT,
        rawColumnCollection : RawT
    ) : (
        ToColumnCollection<TableAliasT, RawT>
    ) {
        const result = {} as any;
        for (let columnName in rawColumnCollection) {
            if (!rawColumnCollection.hasOwnProperty(columnName)) {
                continue;
            }
            const rawColumn = rawColumnCollection[columnName];
            const column = RawColumnUtil.toColumn(tableAlias, columnName, rawColumn);
            result[columnName] = column;
        }
        return result;
    }

    //Convert to ColumnCollection then use ColumnCollectionUtil.NullableColumnNames<>
    //for implementation
    export type NullableColumnNames<RawColumnCollectionT extends RawColumnCollection> = (
        {
            [name in Extract<keyof RawColumnCollectionT, string>]: (
                null extends RawColumnUtil.TypeOf<RawColumnCollectionT[name]> ?
                    name :
                    never
                );
        }[Extract<keyof RawColumnCollectionT, string>]
    );
}
