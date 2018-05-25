import * as sd from "schema-decorator";
import { AliasedExpr, AnyAliasedExpr } from "./aliased-expr";
import { Column } from "../column";
export declare namespace AliasedExprUtil {
    type ToColumn<AliasedExprT extends AnyAliasedExpr> = (Column<AliasedExprT["tableAlias"], AliasedExprT["alias"], ReturnType<AliasedExprT["assertDelegate"]>>);
    type WithType<AliasedExprT extends AnyAliasedExpr, NewTypeT> = (AliasedExpr<AliasedExprT["usedReferences"], AliasedExprT["tableAlias"], AliasedExprT["alias"], NewTypeT>);
    function withType<AliasedExprT extends AnyAliasedExpr, NewTypeT>(aliasedExpr: AliasedExprT, newAssertDelegate: sd.AssertDelegate<NewTypeT>): (WithType<AliasedExprT, NewTypeT>);
}
