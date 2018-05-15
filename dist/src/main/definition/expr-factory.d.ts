import * as d from "../declaration";
import { Expr } from "./expr";
export declare function booleanExpr<UsedReferencesT extends d.PartialColumnReferences>(usedReferences: UsedReferencesT, query: string): Expr<UsedReferencesT, boolean>;
