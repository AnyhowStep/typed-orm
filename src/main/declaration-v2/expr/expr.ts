import * as sd from "schema-decorator";
import {PartialColumnReferences} from "../column-references";
import {Querify} from "../querify";

export class Expr<
    UsedReferencesT extends PartialColumnReferences,
    TypeT
> implements Querify {
    constructor (
        readonly usedReferences : UsedReferencesT,
        readonly assertDelegate : sd.AssertDelegate<TypeT>
    ) {

    }
    querify () {

    }
}
export type AnyExpr = Expr<any, any>;