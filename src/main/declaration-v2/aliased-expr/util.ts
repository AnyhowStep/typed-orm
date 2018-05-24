import * as sd from "schema-decorator";
import {AliasedExpr, AnyAliasedExpr} from "./aliased-expr";
import {Column} from "../column";

export namespace AliasedExprUtil {
    export type ToColumn<AliasedExprT extends AnyAliasedExpr> = (
        Column<
            AliasedExprT["tableAlias"],
            AliasedExprT["alias"],
            ReturnType<AliasedExprT["assertDelegate"]>
        >
    );

    export type WithType<
        AliasedExprT extends AnyAliasedExpr,
        NewTypeT
    > = (
        AliasedExpr<
            AliasedExprT["usedReferences"],
            AliasedExprT["tableAlias"],
            AliasedExprT["alias"],
            NewTypeT
        >
    );
    export function withType<
        AliasedExprT extends AnyAliasedExpr,
        NewTypeT
    > (
        aliasedExpr : AliasedExprT,
        newAssertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        WithType<AliasedExprT, NewTypeT>
    ) {
        return new AliasedExpr(
            aliasedExpr.usedReferences,
            aliasedExpr.tableAlias,
            aliasedExpr.alias,
            newAssertDelegate,
            aliasedExpr.originalQuery
        );
    };
}
