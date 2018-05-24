import {PartialColumnReferences} from "../column-references";
import {Expr} from "../expr";
import * as sd from "schema-decorator";

export function booleanExpr<UsedReferencesT extends PartialColumnReferences> (
    usedReferences : UsedReferencesT,
    query : string
) {
    return new Expr(
        usedReferences,
        sd.numberToBoolean(),
        query
    );
}

export function nullableBooleanExpr<UsedReferencesT extends PartialColumnReferences> (
    usedReferences : UsedReferencesT,
    query : string
) {
    return new Expr(
        usedReferences,
        sd.nullable(sd.numberToBoolean()),
        query
    );
}
