import * as sd from "schema-decorator";

import {PartialColumnReferences} from "../column-references";
import {Querify} from "../querify";

export class AliasedExpr<
    UsedReferencesT extends PartialColumnReferences,
    TableAliasT extends string,
    AliasT extends string,
    TypeT
> implements Querify {
    constructor (
        readonly usedReferences : UsedReferencesT,
        readonly tableAlias : TableAliasT,
        readonly alias  : AliasT,
        readonly assertDelegate : sd.AssertDelegate<TypeT>
    ) {

    }
    querify () {

    }
}
export type AnyAliasedExpr = AliasedExpr<
    PartialColumnReferences,
    string,
    string,
    any
>;
