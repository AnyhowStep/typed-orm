import { RawExpr, AnyRawExpr, AllowedExprConstant } from "./raw-expr";
import { AnyColumn } from "../column";
import { Expr, AnyExpr } from "../expr";
import { AnySelectBuilder } from "../select-builder";
import { AnySelectValue } from "../select-value";
import { Tuple } from "../tuple";
import * as sd from "schema-decorator";
export declare namespace RawExprUtil {
    function isAllowedExprConstant(raw: AnyRawExpr): raw is AllowedExprConstant;
    function querify(raw: RawExpr<any>): string;
    type UsedReferences<RawExprT extends AnyRawExpr> = (RawExprT extends AnySelectBuilder ? {} : RawExprT extends AllowedExprConstant ? {} : RawExprT extends AnyColumn ? {
        readonly [tableAlias in RawExprT["tableAlias"]]: {
            readonly [name in RawExprT["name"]]: RawExprT;
        };
    } : RawExprT extends AnyExpr ? RawExprT["usedReferences"] : never);
    function usedReferences<RawExprT extends AnyRawExpr>(raw: RawExprT): (UsedReferences<RawExprT>);
    type Type<RawExprT extends AnyRawExpr> = (RawExprT extends AllowedExprConstant ? (RawExprT extends undefined ? null : RawExprT) : RawExprT extends AnyColumn ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends AnyExpr ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends AnySelectBuilder ? (RawExprT["data"]["selects"] extends (Tuple<AnySelectValue> & {
        length: 1;
    }) ? ReturnType<RawExprT["data"]["selects"][0]["assertDelegate"]> | null : never) : never);
    function assertDelegate<RawExprT extends AnyRawExpr>(raw: RawExprT): (sd.AssertDelegate<Type<RawExprT>>);
    type ToExpr<RawExprT extends AnyRawExpr> = (Expr<UsedReferences<RawExprT>, Type<RawExprT>>);
    function toExpr<RawExprT extends AnyRawExpr>(raw: RawExprT): (ToExpr<RawExprT>);
    function assertNonNullable(raw: AnyRawExpr): void;
}