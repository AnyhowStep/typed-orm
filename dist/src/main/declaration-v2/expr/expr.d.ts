import * as sd from "schema-decorator";
import { PartialColumnReferences } from "../column-references";
import { Querify } from "../querify";
import { StringBuilder } from "../StringBuilder";
import { AliasedExpr } from "../aliased-expr";
export declare class Expr<UsedReferencesT extends PartialColumnReferences, TypeT> implements Querify {
    readonly usedReferences: UsedReferencesT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    readonly originalQuery: string;
    readonly query: string;
    constructor(usedReferences: UsedReferencesT, assertDelegate: sd.AssertDelegate<TypeT>, originalQuery: string);
    querify(sb: StringBuilder): void;
    as<AliasT extends string>(alias: AliasT): AliasedExpr<UsedReferencesT, "__expr", AliasT, TypeT>;
}
export declare type AnyExpr = Expr<any, any>;
