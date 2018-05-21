import {AnyAliasedExpr} from "./aliased-expr";
import {Column} from "../column";

export namespace AliasedExprUtil {
    export type ToColumn<AliasedExprT extends AnyAliasedExpr> = (
        Column<
            AliasedExprT["tableAlias"],
            AliasedExprT["alias"],
            ReturnType<AliasedExprT["assertDelegate"]>
        >
    );
}
