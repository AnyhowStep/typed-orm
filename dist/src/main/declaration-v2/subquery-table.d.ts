import { SelectBuilder } from "./select-builder";
import { AliasedTable } from "./aliased-table";
import { SelectCollectionUtil } from "./select-collection";
import { StringBuilder } from "./StringBuilder";
export declare class SubqueryTable<AliasT extends string, DataT extends {
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: any;
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}> extends AliasedTable<AliasT, AliasT, SelectCollectionUtil.ToColumnCollection<AliasT, DataT["selects"]>> {
    readonly selectBuilder: SelectBuilder<DataT>;
    constructor(alias: AliasT, selectBuilder: SelectBuilder<DataT>);
    querify(sb: StringBuilder): void;
}
