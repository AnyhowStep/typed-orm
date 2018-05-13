import * as sd from "schema-decorator";
import {IColumn, AnyColumn} from "./column";

export type RawColumn = sd.AssertFunc<any>|AnyColumn;
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
    [name in keyof RawColumnCollectionT] : IColumn<AliasT, name, TypeOf<RawColumnCollectionT[name]>>
};
export type AnyColumnCollection = ColumnCollection<any, {}>;
export type ColumnCollectionElement<ColumnCollectionT extends AnyColumnCollection> = (
    ColumnCollectionT[keyof ColumnCollectionT]
)