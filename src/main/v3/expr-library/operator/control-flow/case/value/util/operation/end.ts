import * as sd from "schema-decorator";
import {Expr} from "../../../../../../../expr";
import {AfterWhenCase} from "./after-when-case";

export type End<
    BuilderT extends AfterWhenCase
> = (
    Expr<{
        usedRef : BuilderT["usedRef"],
        assertDelegate : sd.AssertDelegate<
            ReturnType<BuilderT["result"]>|
            null
        >,
    }>
);
function EndFunction<
    BuilderT extends AfterWhenCase
> (
    builder : BuilderT
) : (
    End<BuilderT>
) {
    return new Expr(
        {
            usedRef : builder.usedRef,
            assertDelegate : sd.nullable(builder.result),
        },
        [
            ...builder.queryTree,
            "END",
        ]
    ) as any;
}
export {EndFunction as end};