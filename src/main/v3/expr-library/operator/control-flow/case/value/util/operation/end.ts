import * as sd from "schema-decorator";
import {ICase} from "../../case";
import {Expr} from "../../../../../../../expr";
import {AfterWhenCase} from "./after-when-case";

export type End<
    BuilderT extends ICase<{
        usedRef : {},
        value : any,
        result : sd.AssertDelegate<any>,
    }>
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