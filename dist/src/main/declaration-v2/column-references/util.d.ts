import { Column, AnyColumn } from "../column";
import { ColumnReferences } from "./column-references";
import { ColumnCollection, ColumnCollectionUtil } from "../column-collection";
import { IsOneStringLiteral } from "../string-util";
export declare namespace ColumnReferencesUtil {
    type ColumnsImpl<RefT extends ColumnReferences> = ({
        [tableAlias in keyof RefT]: ColumnCollectionUtil.Columns<RefT[tableAlias]>;
    }[keyof RefT]);
    type Columns<RefT extends ColumnReferences> = (ColumnsImpl<RefT> extends AnyColumn ? (ColumnsImpl<RefT>) : never);
    type ColumnCollections<RefT extends ColumnReferences> = ({
        [tableAlias in keyof RefT]: (RefT[tableAlias] extends ColumnCollection ? RefT[tableAlias] : never);
    }[keyof RefT]);
    type Partial<RefT extends ColumnReferences> = ({
        readonly [tableAlias in Extract<keyof RefT, string>]+?: {
            readonly [columnName in Extract<keyof RefT[tableAlias], string>]+?: (RefT[tableAlias][columnName] extends AnyColumn ? (RefT[tableAlias][columnName]) : never);
        };
    });
    type ToNullable<RefT extends ColumnReferences> = ({
        readonly [tableAlias in Extract<keyof RefT, string>]: {
            readonly [columnName in Extract<keyof RefT[tableAlias], string>]: (Column<tableAlias, columnName, null | ReturnType<RefT[tableAlias][columnName]["assertDelegate"]>>);
        };
    });
    function toNullable<RefT extends ColumnReferences>(columnReferences: RefT): (ToNullable<RefT>);
    type Merge<RefA extends ColumnReferences, RefB extends ColumnReferences> = ({
        readonly [tableAlias in Extract<Exclude<keyof RefA, keyof RefB>, string>]: (RefA[tableAlias] extends ColumnCollection ? RefA[tableAlias] : never);
    } & {
        readonly [tableAlias in Extract<Exclude<keyof RefB, keyof RefA>, string>]: (RefB[tableAlias] extends ColumnCollection ? RefB[tableAlias] : never);
    } & {
        readonly [tableAlias in Extract<Extract<keyof RefA, keyof RefB>, string>]: (RefA[tableAlias] extends ColumnCollection ? (RefB[tableAlias] extends ColumnCollection ? ColumnCollectionUtil.Merge<RefA[tableAlias], RefB[tableAlias]> : never) : never);
    });
    function merge<RefA extends ColumnReferences, RefB extends ColumnReferences>(refA: RefA, refB: RefB): Merge<RefA, RefB>;
    type ToConvenient<RefT extends ColumnReferences> = (keyof RefT extends never ? {} : IsOneStringLiteral<Extract<keyof RefT, string>> extends true ? RefT[Extract<keyof RefT, string>] : RefT);
    function toConvenient<RefT extends ColumnReferences>(ref: RefT): ToConvenient<RefT>;
    function hasColumn<RefT extends ColumnReferences, ColumnT extends AnyColumn>(ref: RefT, column: ColumnT): ref is (RefT & {
        readonly [tableAlias in ColumnT["tableAlias"]]: {
            readonly [columnName in ColumnT["name"]]: ColumnT;
        };
    });
    function hasColumn<CollectionT extends ColumnCollection, ColumnT extends AnyColumn>(collection: CollectionT, column: ColumnT): collection is (CollectionT & {
        readonly [columnName in ColumnT["name"]]: ColumnT;
    });
    function assertHasColumn(ref: ColumnReferences, column: AnyColumn): void;
    function assertHasColumns(ref: ColumnReferences, arr: AnyColumn[]): void;
    function assertHasColumnReferences(ref: ColumnReferences, targetReferences: ColumnReferences): void;
}
