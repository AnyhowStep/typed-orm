import * as sd from "schema-decorator";
import { PartialColumnReferences } from "../column-references";
import { Querify } from "../querify";
import { StringBuilder } from "../StringBuilder";
export declare class AliasedExpr<UsedReferencesT extends PartialColumnReferences, TableAliasT extends string, AliasT extends string, TypeT> implements Querify {
    readonly usedReferences: UsedReferencesT;
    readonly tableAlias: TableAliasT;
    readonly alias: AliasT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    readonly originalQuery: string;
    readonly query: string;
    constructor(usedReferences: UsedReferencesT, tableAlias: TableAliasT, alias: AliasT, assertDelegate: sd.AssertDelegate<TypeT>, originalQuery: string);
    querify(sb: StringBuilder): void;
}
export declare type AnyAliasedExpr = AliasedExpr<PartialColumnReferences, string, string, any>;
//# sourceMappingURL=aliased-expr.d.ts.map