import * as sd from "schema-decorator";
import { RawExpr } from "../../raw-expr";
import { TypeOf } from "./type-of";
export declare type AssertDelegate<RawExprT extends RawExpr<any>> = (sd.AssertDelegate<TypeOf<RawExprT>>);
export declare function assertDelegate<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): AssertDelegate<RawExprT>;
