import {ColumnCollection} from "../column-collection";
import {Querify} from "../querify";

export class AliasedTable<
    AliasT extends string,
    NameT extends string,
    ColumnCollectionT extends ColumnCollection
> implements Querify {
    constructor (
        readonly alias : AliasT,
        readonly name  : NameT,
        readonly columns : ColumnCollectionT
    ) {

    }

    querify () {

    }
}
export type AnyAliasedTable = AliasedTable<string, string, ColumnCollection>;
