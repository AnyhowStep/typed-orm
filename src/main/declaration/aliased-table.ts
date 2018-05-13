import {RawColumnCollection, ColumnCollection} from "./column-collection";
import {Querify} from "./querify";

export interface AliasedTable<
    AliasT extends string,
    NameT extends string,
    RawColumnCollectionT extends RawColumnCollection
> extends Querify {
    readonly alias : AliasT;
    readonly name  : NameT;
    readonly columns : ColumnCollection<AliasT, RawColumnCollectionT>;
}
export type AnyAliasedTable = AliasedTable<any, any, {}>;
