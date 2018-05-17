import * as sd from "schema-decorator";
import {IColumn, AnyColumn} from "./column";

export type RawColumn = sd.AssertFunc<any>|AnyColumn;
export type TypedRawColumn<T> = sd.AssertFunc<T>|IColumn<any, any, T>;
export declare type TypeOf<RawColumnT extends RawColumn> = (
    RawColumnT extends sd.AssertFunc<infer T> ?
    T :
    RawColumnT extends IColumn<any, any, infer T> ?
    T :
    never
)
export declare type RawColumnCollection = {
    [name: string]: RawColumn;
};

export type ColumnCollection<AliasT extends string, RawColumnCollectionT extends RawColumnCollection> = {
    [name in Extract<keyof RawColumnCollectionT, string>] : IColumn<AliasT, name, TypeOf<RawColumnCollectionT[name]>>
};
export type AnyColumnCollection = ColumnCollection<any, {}>;
export type ColumnCollectionElement<ColumnCollectionT extends AnyColumnCollection> = (
    ColumnCollectionT[keyof ColumnCollectionT]
)
