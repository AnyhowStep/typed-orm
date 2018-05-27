import { UniqueKey } from "./unique-key";
import { ColumnCollection } from "../column-collection";
import * as sd from "schema-decorator";
export declare namespace UniqueKeyUtil {
    type WithType<UniqueKeyT extends UniqueKey, ColumnCollectionT extends ColumnCollection> = ({
        [columnName in Extract<Extract<keyof ColumnCollectionT, string>, keyof UniqueKeyT>]: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    } & {
        [columnName in Exclude<Extract<keyof ColumnCollectionT, string>, keyof UniqueKeyT>]?: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    });
    function assertDelegate<UniqueKeyT extends UniqueKey, ColumnCollectionT extends ColumnCollection>(uniqueKey: UniqueKey, columns: ColumnCollectionT): (sd.AssertDelegate<WithType<UniqueKeyT, ColumnCollectionT>>);
}