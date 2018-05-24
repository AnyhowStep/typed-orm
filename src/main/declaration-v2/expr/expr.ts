import * as sd from "schema-decorator";
import {PartialColumnReferences} from "../column-references";
import {Querify} from "../querify";
import {StringBuilder} from "../StringBuilder";
import {AliasedExpr} from "../aliased-expr";

export class Expr<
    UsedReferencesT extends PartialColumnReferences,
    TypeT
> implements Querify {
    readonly query : string;
    constructor (
        readonly usedReferences : UsedReferencesT,
        readonly assertDelegate : sd.AssertDelegate<TypeT>,
        readonly originalQuery : string
    ) {
        //These tests introduce more risk that a query will be evaluated incorrectly
        if (/\s/.test(originalQuery)) {
            this.query = `(${originalQuery})`;
        } else {
            this.query = originalQuery;
        }
    }
    querify (sb : StringBuilder) {
        sb.append(this.query);
    }
    as<AliasT extends string>(alias : AliasT) : AliasedExpr<
        UsedReferencesT,
        "__expr",
        AliasT,
        TypeT
    > {
        return new AliasedExpr(
            this.usedReferences,
            "__expr",
            alias,
            this.assertDelegate,
            this.query
        );
    }
}
export type AnyExpr = Expr<any, any>;