import { TableData, AutoIncrementDelegate, IsGeneratedDelegate, HasDefaultValueDelegate, IsMutableDelegate, AddUniqueKeyDelegate, IdDelegate } from "./table-data";
import { ReadonlyRemoveKey } from "../obj-util";
import { ColumnCollection } from "../column-collection";
import { Tuple, TupleKeys, TupleWPush, TupleWiden, TupleWConcat } from "../tuple";
import { Column, AnyColumn, ColumnUtil } from "../column";
import { UniqueKey } from "../unique-key";
import { AnyTable } from "../table";
import { UniqueKeyCollection, UniqueKeyCollectionUtil } from "../unique-key-collection";
import { TableParentCollection } from "../table-parent-collection";
import * as fieldUtil from "../field-util";
import * as sd from "schema-decorator";
export declare namespace TableDataUtil {
    type AutoIncrement<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>> = ({
        readonly [key in keyof DataT]: (key extends "autoIncrement" ? ReturnType<AutoIncrementDelegateT> : key extends "isGenerated" ? {
            readonly [columnName in (ReturnType<AutoIncrementDelegateT>["name"] | Extract<keyof DataT["isGenerated"], string>)]: true;
        } : key extends "hasDefaultValue" ? {
            readonly [columnName in (ReturnType<AutoIncrementDelegateT>["name"] | Extract<keyof DataT["hasDefaultValue"], string>)]: true;
        } : key extends "id" ? ReturnType<AutoIncrementDelegateT> : key extends "uniqueKeys" ? (DataT["uniqueKeys"] extends never ? any : DataT["uniqueKeys"] extends Tuple<UniqueKey> ? (TupleWPush<UniqueKey, DataT["uniqueKeys"], {
            [columnName in ReturnType<AutoIncrementDelegateT>["name"]]: true;
        }>) : TupleWiden<[{
            [columnName in ReturnType<AutoIncrementDelegateT>["name"]]: true;
        }], UniqueKey>) : DataT[key]);
    });
    function autoIncrement<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: AutoIncrementDelegateT): (AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>);
    type UnsetAutoIncrement<DataT extends TableData> = (DataT["autoIncrement"] extends AnyColumn ? {
        readonly [key in keyof DataT]: (key extends "autoIncrement" ? undefined : key extends "isGenerated" ? ReadonlyRemoveKey<DataT["isGenerated"], DataT["autoIncrement"]["name"]> : key extends "hasDefaultValue" ? ReadonlyRemoveKey<DataT["hasDefaultValue"], DataT["autoIncrement"]["name"]> : DataT[key]);
    } : DataT);
    function unsetAutoIncrement<DataT extends TableData>(data: DataT): (UnsetAutoIncrement<DataT>);
    type IsGenerated<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsGeneratedDelegateT extends IsGeneratedDelegate<DataT, ColumnCollectionT>> = (ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>] extends AnyColumn ? {
        readonly autoIncrement: DataT["autoIncrement"];
        readonly isGenerated: {
            readonly [columnName in (ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>]["name"] | keyof DataT["isGenerated"])]: true;
        };
        readonly hasDefaultValue: {
            readonly [columnName in (ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>]["name"] | keyof DataT["hasDefaultValue"])]: true;
        };
        readonly isMutable: {
            readonly [columnName in Exclude<Extract<keyof DataT["isMutable"], string>, ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>]["name"]>]: true;
        };
        readonly id: DataT["id"];
        readonly uniqueKeys: DataT["uniqueKeys"];
        readonly parentTables: DataT["parentTables"];
    } : never);
    function isGenerated<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsGeneratedDelegateT extends IsGeneratedDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: IsGeneratedDelegateT): (IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>);
    type HasDefaultValue<DataT extends TableData, ColumnCollectionT extends ColumnCollection, HasDefaultValueDelegateT extends HasDefaultValueDelegate<DataT, ColumnCollectionT>> = (ReturnType<HasDefaultValueDelegateT>[TupleKeys<ReturnType<HasDefaultValueDelegateT>>] extends AnyColumn ? {
        readonly [key in keyof DataT]: (key extends "hasDefaultValue" ? DataT["hasDefaultValue"] & {
            readonly [columnName in ReturnType<HasDefaultValueDelegateT>[TupleKeys<ReturnType<HasDefaultValueDelegateT>>]["name"]]: true;
        } : DataT[key]);
    } : never);
    function hasDefaultValue<DataT extends TableData, ColumnCollectionT extends ColumnCollection, HasDefaultValueDelegateT extends HasDefaultValueDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: HasDefaultValueDelegateT): (HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>);
    type IsMutable<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsMutableDelegateT extends IsMutableDelegate<DataT, ColumnCollectionT>> = (ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>] extends AnyColumn ? {
        readonly [key in keyof DataT]: (key extends "isMutable" ? DataT["isMutable"] & {
            readonly [columnName in ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>]["name"]]: true;
        } : DataT[key]);
    } : never);
    function isMutable<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsMutableDelegateT extends IsMutableDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: IsMutableDelegateT): (IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>);
    type Immutable<DataT extends TableData> = ({
        readonly [key in keyof DataT]: (key extends "isMutable" ? {} : DataT[key]);
    });
    function immutable<DataT extends TableData>(data: DataT): (Immutable<DataT>);
    type Id<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IdDelegateT extends IdDelegate<DataT, ColumnCollectionT>> = ({
        readonly [key in keyof DataT]: (key extends "id" ? ReturnType<IdDelegateT> : key extends "uniqueKeys" ? (DataT["uniqueKeys"] extends Tuple<UniqueKey> ? (TupleWPush<UniqueKey, DataT["uniqueKeys"], {
            [columnName in ReturnType<IdDelegateT>["name"]]: true;
        }>) : TupleWiden<[{
            [columnName in ReturnType<IdDelegateT>["name"]]: true;
        }], UniqueKey>) : DataT[key]);
    });
    function id<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IdDelegateT extends IdDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: IdDelegateT): (Id<DataT, ColumnCollectionT, IdDelegateT>);
    type ToUniqueKeyImpl<TupleT extends fieldUtil.AnyFieldTuple, K extends string> = (K extends keyof TupleT ? (TupleT[K] extends Column<any, infer NameT, any> ? {
        readonly [name in NameT]: true;
    } : TupleT[K] extends sd.Field<infer NameT, any> ? {
        readonly [name in NameT]: true;
    } : {}) : {});
    type ToUniqueKey<TupleT extends fieldUtil.AnyFieldTuple> = (ToUniqueKeyImpl<TupleT, "0"> & ToUniqueKeyImpl<TupleT, "1"> & ToUniqueKeyImpl<TupleT, "1"> & ToUniqueKeyImpl<TupleT, "3"> & ToUniqueKeyImpl<TupleT, "4"> & ToUniqueKeyImpl<TupleT, "5"> & ToUniqueKeyImpl<TupleT, "6"> & ToUniqueKeyImpl<TupleT, "7"> & ToUniqueKeyImpl<TupleT, "8"> & ToUniqueKeyImpl<TupleT, "9">);
    type AddUniqueKey<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>> = ({
        readonly [key in keyof DataT]: (key extends "uniqueKeys" ? (DataT["uniqueKeys"] extends Tuple<UniqueKey> ? (TupleWPush<UniqueKey, DataT["uniqueKeys"], ToUniqueKey<ReturnType<AddUniqueKeyDelegateT>>>) : TupleWiden<[ToUniqueKey<ReturnType<AddUniqueKeyDelegateT>>], UniqueKey>) : DataT[key]);
    });
    type AddUniqueKeyFromFieldsUnsafe<DataT extends TableData, FieldsT extends fieldUtil.AnyFieldTuple> = ({
        readonly [key in keyof DataT]: (key extends "uniqueKeys" ? (DataT["uniqueKeys"] extends Tuple<UniqueKey> ? (TupleWPush<UniqueKey, DataT["uniqueKeys"], ToUniqueKey<FieldsT>>) : TupleWiden<[ToUniqueKey<FieldsT>], UniqueKey>) : DataT[key]);
    });
    function toUniqueKey<TupleT extends fieldUtil.AnyFieldTuple>(tuple: TupleT): ToUniqueKey<TupleT>;
    function addUniqueKey<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: AddUniqueKeyDelegateT): (AddUniqueKey<DataT, ColumnCollectionT, AddUniqueKeyDelegateT>);
    function addUniqueKeyFromFieldsUnsafe<DataT extends TableData, FieldsT extends fieldUtil.AnyFieldTuple>(data: DataT, fields: FieldsT): (AddUniqueKeyFromFieldsUnsafe<DataT, FieldsT>);
    type WithTableAliasGeneric<DataT extends TableData, TableAliasT extends string> = ({
        readonly autoIncrement: (DataT["autoIncrement"] extends AnyColumn ? ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> : DataT["autoIncrement"] extends undefined ? undefined : DataT["autoIncrement"] extends AnyColumn | undefined ? ColumnUtil.WithTableAlias<Extract<DataT["autoIncrement"], AnyColumn>, TableAliasT> | undefined : undefined);
        readonly isGenerated: DataT["isGenerated"];
        readonly hasDefaultValue: DataT["hasDefaultValue"];
        readonly isMutable: DataT["isMutable"];
        readonly id: (DataT["id"] extends AnyColumn ? ColumnUtil.WithTableAlias<DataT["id"], TableAliasT> : DataT["id"] extends undefined ? undefined : DataT["id"] extends AnyColumn | undefined ? ColumnUtil.WithTableAlias<Extract<DataT["id"], AnyColumn>, TableAliasT> | undefined : undefined);
        readonly uniqueKeys: DataT["uniqueKeys"];
        readonly parentTables: DataT["parentTables"];
    });
    type WithTableAlias<DataT extends TableData, TableAliasT extends string> = ({
        readonly autoIncrement: (DataT["autoIncrement"] extends AnyColumn ? ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> : undefined);
        readonly isGenerated: DataT["isGenerated"];
        readonly hasDefaultValue: DataT["hasDefaultValue"];
        readonly isMutable: DataT["isMutable"];
        readonly id: (DataT["id"] extends AnyColumn ? ColumnUtil.WithTableAlias<DataT["id"], TableAliasT> : undefined);
        readonly uniqueKeys: DataT["uniqueKeys"];
        readonly parentTables: DataT["parentTables"];
    });
    function withTableAlias<DataT extends TableData, TableAliasT extends string>(data: DataT, tableAlias: TableAliasT): (WithTableAlias<DataT, TableAliasT>);
    type AddParentTable<DataT extends TableData, ParentT extends AnyTable> = (DataT["uniqueKeys"] extends UniqueKeyCollection ? (ParentT["data"]["uniqueKeys"] extends UniqueKeyCollection ? (UniqueKeyCollectionUtil.CommonUniqueKeys<DataT["uniqueKeys"], ParentT["data"]["uniqueKeys"]> extends never ? never : (DataT["parentTables"] extends TableParentCollection ? (ParentT["data"]["parentTables"] extends TableParentCollection ? ({
        [key in keyof DataT]: (key extends "parentTables" ? TupleWPush<AnyTable, TupleWConcat<AnyTable, DataT["parentTables"], ParentT["data"]["parentTables"]>, ParentT> : DataT[key]);
    }) : ({
        [key in keyof DataT]: (key extends "parentTables" ? TupleWPush<AnyTable, DataT["parentTables"], ParentT> : DataT[key]);
    })) : (ParentT["data"]["parentTables"] extends TableParentCollection ? ({
        [key in keyof DataT]: (key extends "parentTables" ? TupleWPush<AnyTable, ParentT["data"]["parentTables"], ParentT> : DataT[key]);
    }) : ({
        [key in keyof DataT]: (key extends "parentTables" ? TupleWiden<[ParentT], AnyTable> : DataT[key]);
    })))) : never) : never);
    function addParentTable<DataT extends TableData, ParentT extends AnyTable>(data: DataT, parent: ParentT): any;
}
