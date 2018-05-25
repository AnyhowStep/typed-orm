import { ColumnCollection } from "../column-collection";
import { Querify } from "../querify";
import { StringBuilder } from "../StringBuilder";
export declare class AliasedTable<AliasT extends string, NameT extends string, ColumnCollectionT extends ColumnCollection> implements Querify {
    readonly alias: AliasT;
    readonly name: NameT;
    readonly columns: ColumnCollectionT;
    readonly query: string;
    constructor(alias: AliasT, name: NameT, columns: ColumnCollectionT);
    querify(sb: StringBuilder): void;
}
export declare type AnyAliasedTable = AliasedTable<string, string, ColumnCollection>;
