import { RawColumnCollection } from "./raw-column-collection";
import { RawColumnUtil } from "../raw-column";
export declare namespace RawColumnCollectionUtil {
    type ToColumnCollection<TableAliasT extends string, RawT extends RawColumnCollection> = ({
        readonly [columnName in Extract<keyof RawT, string>]: (RawColumnUtil.ToColumn<TableAliasT, columnName, RawT[columnName]>);
    });
    function toColumnCollection<TableAliasT extends string, RawT extends RawColumnCollection>(tableAlias: TableAliasT, rawColumnCollection: RawT): (ToColumnCollection<TableAliasT, RawT>);
    type NullableColumnNames<RawColumnCollectionT extends RawColumnCollection> = ({
        [name in Extract<keyof RawColumnCollectionT, string>]: (null extends RawColumnUtil.TypeOf<RawColumnCollectionT[name]> ? name : never);
    }[Extract<keyof RawColumnCollectionT, string>]);
}
