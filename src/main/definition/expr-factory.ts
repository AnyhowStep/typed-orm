//TODO RENAME FILE
import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Expr} from "./expr";

export function booleanExpr<UsedReferencesT extends d.PartialColumnReferences> (
    usedReferences : UsedReferencesT,
    query : string
) {
    return new Expr(
        usedReferences,
        sd.numberToBoolean(),
        query
    );
}
