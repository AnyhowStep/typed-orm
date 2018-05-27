import { TableData, AutoIncrementDelegate, IsGeneratedDelegate, HasDefaultValueDelegate, IsMutableDelegate, AddUniqueKeyDelegate } from "./table-data";
import { RemoveKey, ReplaceValue, ReplaceValue3 } from "../obj-util";
import { ColumnCollection } from "../column-collection";
import { Tuple, TupleKeys, TupleWPush, TupleWiden } from "../tuple";
import { Column, AnyColumn, ColumnUtil } from "../column";
import { UniqueKey } from "../unique-key";
export declare namespace TableDataUtil {
    type AutoIncrement<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>> = ({
        [key in keyof DataT]: (key extends "autoIncrement" ? ReturnType<AutoIncrementDelegateT> : key extends "isGenerated" ? {
            [columnName in (ReturnType<AutoIncrementDelegateT>["name"] | Extract<keyof DataT["isGenerated"], string>)]: true;
        } : key extends "hasDefaultValue" ? {
            [columnName in (ReturnType<AutoIncrementDelegateT>["name"] | Extract<keyof DataT["hasDefaultValue"], string>)]: true;
        } : key extends "uniqueKeys" ? (DataT["uniqueKeys"] extends Tuple<UniqueKey> ? (TupleWPush<UniqueKey, DataT["uniqueKeys"], {
            [columnName in ReturnType<AutoIncrementDelegateT>["name"]]: true;
        }>) : TupleWiden<[{
            [columnName in ReturnType<AutoIncrementDelegateT>["name"]]: true;
        }], UniqueKey>) : DataT[key]);
    });
    function autoIncrement<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: AutoIncrementDelegateT): (AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>);
    type UnsetAutoIncrement<DataT extends TableData> = (DataT["autoIncrement"] extends AnyColumn ? ReplaceValue3<DataT, "autoIncrement", undefined, "isGenerated", RemoveKey<DataT["isGenerated"], DataT["autoIncrement"]["name"]>, "hasDefaultValue", RemoveKey<DataT["hasDefaultValue"], DataT["autoIncrement"]["name"]>> : DataT);
    function unsetAutoIncrement<DataT extends TableData>(data: DataT): (UnsetAutoIncrement<DataT>);
    type IsGenerated<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsGeneratedDelegateT extends IsGeneratedDelegate<DataT, ColumnCollectionT>> = (ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>] extends AnyColumn ? ReplaceValue3<DataT, "isGenerated", DataT["isGenerated"] & {
        [columnName in ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>]["name"]]: true;
    }, "hasDefaultValue", DataT["hasDefaultValue"] & {
        [columnName in ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>]["name"]]: true;
    }, "isMutable", {
        [columnName in Exclude<Extract<keyof DataT["isMutable"], string>, ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>]["name"]>]: true;
    }> : never);
    function isGenerated<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsGeneratedDelegateT extends IsGeneratedDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: IsGeneratedDelegateT): (IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>);
    type HasDefaultValue<DataT extends TableData, ColumnCollectionT extends ColumnCollection, HasDefaultValueDelegateT extends HasDefaultValueDelegate<DataT, ColumnCollectionT>> = (ReturnType<HasDefaultValueDelegateT>[TupleKeys<ReturnType<HasDefaultValueDelegateT>>] extends AnyColumn ? ReplaceValue<DataT, "hasDefaultValue", DataT["hasDefaultValue"] & {
        [columnName in ReturnType<HasDefaultValueDelegateT>[TupleKeys<ReturnType<HasDefaultValueDelegateT>>]["name"]]: true;
    }> : never);
    function hasDefaultValue<DataT extends TableData, ColumnCollectionT extends ColumnCollection, HasDefaultValueDelegateT extends HasDefaultValueDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: HasDefaultValueDelegateT): (HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>);
    type IsMutable<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsMutableDelegateT extends IsMutableDelegate<DataT, ColumnCollectionT>> = (ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>] extends AnyColumn ? ReplaceValue<DataT, "isMutable", DataT["isMutable"] & {
        [columnName in ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>]["name"]]: true;
    }> : never);
    function isMutable<DataT extends TableData, ColumnCollectionT extends ColumnCollection, IsMutableDelegateT extends IsMutableDelegate<DataT, ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: IsMutableDelegateT): (IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>);
    type Immutable<DataT extends TableData> = ({
        [key in keyof DataT]: (key extends "isMutable" ? {} : DataT[key]);
    });
    function immutable<DataT extends TableData>(data: DataT): (Immutable<DataT>);
    type ToUniqueKeyImpl<TupleT extends Tuple<AnyColumn>, K extends string> = (K extends keyof TupleT ? (TupleT[K] extends Column<any, infer NameT, any> ? {
        [name in NameT]: true;
    } : {}) : {});
    type ToUniqueKey<TupleT extends Tuple<AnyColumn>> = (ToUniqueKeyImpl<TupleT, "0"> & ToUniqueKeyImpl<TupleT, "1"> & ToUniqueKeyImpl<TupleT, "1"> & ToUniqueKeyImpl<TupleT, "3"> & ToUniqueKeyImpl<TupleT, "4"> & ToUniqueKeyImpl<TupleT, "5"> & ToUniqueKeyImpl<TupleT, "6"> & ToUniqueKeyImpl<TupleT, "7"> & ToUniqueKeyImpl<TupleT, "8"> & ToUniqueKeyImpl<TupleT, "9">);
    type AddUniqueKey<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>> = ({
        [key in keyof DataT]: (key extends "uniqueKeys" ? (DataT["uniqueKeys"] extends Tuple<UniqueKey> ? (TupleWPush<UniqueKey, DataT["uniqueKeys"], ToUniqueKey<ReturnType<AddUniqueKeyDelegateT>>>) : TupleWiden<[ToUniqueKey<ReturnType<AddUniqueKeyDelegateT>>], UniqueKey>) : DataT[key]);
    });
    function toUniqueKey<TupleT extends Tuple<AnyColumn>>(tuple: TupleT): ToUniqueKey<TupleT>;
    function addUniqueKey<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: AddUniqueKeyDelegateT): (AddUniqueKey<DataT, ColumnCollectionT, AddUniqueKeyDelegateT>);
    type WithTableAlias<DataT extends TableData, TableAliasT extends string> = (ReplaceValue<DataT, "autoIncrement", (DataT["autoIncrement"] extends AnyColumn ? ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> : undefined)>);
    function withTableAlias<DataT extends TableData, TableAliasT extends string>(data: DataT, tableAlias: TableAliasT): (WithTableAlias<DataT, TableAliasT>);
}
