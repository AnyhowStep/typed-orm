import { UniqueKey } from "./unique-key";
import { ColumnCollection } from "../column-collection";
import * as sd from "schema-decorator";
export declare namespace UniqueKeyUtil {
    type MinimalWithType<UniqueKeyT extends UniqueKey, ColumnCollectionT extends ColumnCollection> = ({
        [columnName in Extract<Extract<keyof ColumnCollectionT, string>, keyof UniqueKeyT>]: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    });
    type WithType<UniqueKeyT extends UniqueKey, ColumnCollectionT extends ColumnCollection> = (MinimalWithType<UniqueKeyT, ColumnCollectionT> & {
        [columnName in Exclude<Extract<keyof ColumnCollectionT, string>, keyof UniqueKeyT>]?: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    });
    function assertDelegate<UniqueKeyT extends UniqueKey, ColumnCollectionT extends ColumnCollection>(uniqueKey: UniqueKey, columns: ColumnCollectionT): (sd.AssertDelegate<WithType<UniqueKeyT, ColumnCollectionT>>);
    function minimalAssertDelegate<UniqueKeyT extends UniqueKey, ColumnCollectionT extends ColumnCollection>(uniqueKey: UniqueKey, columns: ColumnCollectionT): (sd.AssertDelegate<MinimalWithType<UniqueKeyT, ColumnCollectionT>>);
    function isEqual(a: UniqueKey, b: UniqueKey): boolean;
}
//# sourceMappingURL=util.d.ts.map