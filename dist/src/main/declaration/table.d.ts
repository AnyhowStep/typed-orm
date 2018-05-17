import { IColumn, AnyColumn } from "./column";
import { AliasedTable } from "./aliased-table";
import { RawColumnCollection, ColumnCollection, AnyColumnCollection, ColumnCollectionElement } from "./column-collection";
import { Tuple, TupleKeys } from "./tuple";
import { NullableColumnNames } from "./column-operation";
export interface RawTableData {
    autoIncrement: undefined | IColumn<any, any, number>;
    hasServerDefaultValue: {
        [name: string]: true;
    };
    isMutable: {
        [name: string]: true;
    };
}
export declare type AutoIncrementDelegate<ColumnCollectionT extends AnyColumnCollection> = ((columns: ColumnCollectionT) => ColumnCollectionElement<ColumnCollectionT>);
export declare type HasServerDefaultValueDelegate<ColumnCollectionT extends AnyColumnCollection> = ((columns: ColumnCollectionT) => Tuple<ColumnCollectionElement<ColumnCollectionT>>);
export declare type IsMutableDelegate<ColumnCollectionT extends AnyColumnCollection> = ((columns: ColumnCollectionT) => Tuple<ColumnCollectionElement<ColumnCollectionT>>);
export interface ITable<AliasT extends string, NameT extends string, RawColumnCollectionT extends RawColumnCollection, DataT extends RawTableData> extends AliasedTable<AliasT, NameT, RawColumnCollectionT> {
    readonly data: DataT;
    as<NewAliasT extends string>(alias: NewAliasT): AliasedTable<NewAliasT, NameT, RawColumnCollectionT>;
    autoIncrement<AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollection<AliasT, RawColumnCollectionT>>>(autoIncrementDelegate: AutoIncrementDelegateT): (ReturnType<AutoIncrementDelegateT> extends IColumn<any, infer AutoIncrementNameT, any> ? ITable<AliasT, NameT, RawColumnCollectionT, {
        autoIncrement: ReturnType<AutoIncrementDelegateT>;
        hasServerDefaultValue: (DataT["hasServerDefaultValue"] & {
            [name in AutoIncrementNameT]: true;
        });
        isMutable: DataT["isMutable"];
    }> : ("Invalid return type or could not infer AutoIncrementNameT" | void | never));
    setHasServerDefaultValue<HasServerDefaultValueDelegateT extends HasServerDefaultValueDelegate<ColumnCollection<AliasT, RawColumnCollectionT>>>(hasServerDefaultValueDelegate: HasServerDefaultValueDelegateT): (ReturnType<HasServerDefaultValueDelegateT>[TupleKeys<ReturnType<HasServerDefaultValueDelegateT>>] extends AnyColumn ? ITable<AliasT, NameT, RawColumnCollectionT, {
        autoIncrement: DataT["autoIncrement"];
        hasServerDefaultValue: ({
            [k in ReturnType<HasServerDefaultValueDelegateT>[TupleKeys<ReturnType<HasServerDefaultValueDelegateT>>]["name"]]: true;
        } & (DataT["autoIncrement"] extends AnyColumn ? {
            [name in DataT["autoIncrement"]["name"]]: true;
        } : {}) & {
            [name in NullableColumnNames<ColumnCollection<NameT, RawColumnCollectionT>>]: true;
        });
        isMutable: DataT["isMutable"];
    }> : never);
    setIsMutable<IsMutableDelegateT extends IsMutableDelegate<ColumnCollection<AliasT, RawColumnCollectionT>>>(isMutableDelegate: IsMutableDelegateT): (ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>] extends AnyColumn ? ITable<AliasT, NameT, RawColumnCollectionT, {
        autoIncrement: DataT["autoIncrement"];
        hasServerDefaultValue: DataT["hasServerDefaultValue"];
        isMutable: {
            [k in ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>]["name"]]: true;
        };
    }> : never);
    setImmutable(): ITable<AliasT, NameT, RawColumnCollectionT, {
        autoIncrement: DataT["autoIncrement"];
        hasServerDefaultValue: DataT["hasServerDefaultValue"];
        isMutable: {};
    }>;
}
export declare type CreateTableDelegate = (<NameT extends string, RawColumnCollectionT extends RawColumnCollection>(name: NameT, rawColumns: RawColumnCollectionT) => (ITable<NameT, NameT, RawColumnCollectionT, {
    autoIncrement: undefined;
    hasServerDefaultValue: {
        [name in NullableColumnNames<ColumnCollection<NameT, RawColumnCollectionT>>]: true;
    };
    isMutable: {
        [name in keyof RawColumnCollectionT]: true;
    };
}>));
