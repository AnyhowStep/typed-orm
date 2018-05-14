import * as d from "../declaration";

export class SubSelectJoinTable<
    AliasT extends string,
    RawColumnCollectionT extends d.RawColumnCollection
> implements d.AliasedTable<
    AliasT,
    AliasT,
    RawColumnCollectionT
> {
    public constructor (alias : AliasT, selectBuilder : d.ISelectBuilder<>) {

    }
}
