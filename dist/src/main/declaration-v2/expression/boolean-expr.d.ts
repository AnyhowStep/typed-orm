import { PartialColumnReferences } from "../column-references";
import { Expr } from "../expr";
export declare function booleanExpr<UsedReferencesT extends PartialColumnReferences>(usedReferences: UsedReferencesT, query: string): Expr<UsedReferencesT, boolean>;
export declare function nullableBooleanExpr<UsedReferencesT extends PartialColumnReferences>(usedReferences: UsedReferencesT, query: string): Expr<UsedReferencesT, boolean | null>;
//# sourceMappingURL=boolean-expr.d.ts.map