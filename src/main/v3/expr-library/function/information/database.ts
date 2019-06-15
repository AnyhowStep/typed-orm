import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database
export function database() : (
    Expr<{
        usedRef : {},
        assertDelegate : sd.SafeMapper<string|null>,
    }>
) {
    return new Expr(
        {
            usedRef : {},
            assertDelegate : sd.orNull(sd.string()),
        },
        new FunctionCall("DATABASE", [])
    );
}