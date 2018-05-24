import * as sd from "schema-decorator";
import {PartialColumnReferences} from "../column-references";
import {Querify} from "../querify";
import {StringBuilder} from "../StringBuilder";
import * as mysql from "typed-mysql";

export class AliasedExpr<
    UsedReferencesT extends PartialColumnReferences,
    TableAliasT extends string,
    AliasT extends string,
    TypeT
> implements Querify {
    readonly query : string;
    constructor (
        readonly usedReferences : UsedReferencesT,
        readonly tableAlias : TableAliasT,
        readonly alias  : AliasT,
        readonly assertDelegate : sd.AssertDelegate<TypeT>,
        readonly originalQuery : string
    ) {

        const queryAlias = mysql.escapeId(`${tableAlias}--${alias}`);
        //These tests introduce more risk that a query will be evaluated incorrectly
        if (/\s/.test(originalQuery)) {
            this.query = `(${originalQuery}) AS ${queryAlias}`;
        } else {
            this.query = `${originalQuery} AS ${queryAlias}`;
        }
    }
    querify (sb : StringBuilder) {
        sb.append(this.query);
    }
}
export type AnyAliasedExpr = AliasedExpr<
    PartialColumnReferences,
    string,
    string,
    any
>;
