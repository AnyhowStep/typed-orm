import { TableData, AutoIncrementDelegate, IsGeneratedDelegate, HasDefaultValueDelegate, IsMutableDelegate } from "./table-data";
import { ReplaceValue, ReplaceValue3, ReplaceValue4 } from "../obj-util";
import { ColumnCollection } from "../column-collection";
import { TupleKeys } from "../tuple";
import { AnyColumn } from "../column";
export declare namespace TableDataUtil {
    type AutoIncrement<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>> = (ReplaceValue4<DataT, "autoIncrement", ReturnType<AutoIncrementDelegateT>, "isGenerated", DataT["isGenerated"] & {
        [columnName in ReturnType<AutoIncrementDelegateT>["name"]]: true;
    }, "hasDefaultValue", DataT["hasDefaultValue"] & {
        [columnName in ReturnType<AutoIncrementDelegateT>["name"]]: true;
    }, "isMutable", {
        [columnName in Exclude<Extract<keyof DataT["isMutable"], string>, ReturnType<AutoIncrementDelegateT>["name"]>]: true;
    }>);
    function autoIncrement<DataT extends TableData, ColumnCollectionT extends ColumnCollection, AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>>(data: DataT, columnCollection: ColumnCollectionT, delegate: AutoIncrementDelegateT): (AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>);
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
    type Immutable<DataT extends TableData> = (ReplaceValue<DataT, "isMutable", {}>);
    function immutable<DataT extends TableData>(data: DataT): (Immutable<DataT>);
}
