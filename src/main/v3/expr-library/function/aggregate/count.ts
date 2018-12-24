import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_count
export function count () : (
    Expr<{
        usedRef : {},
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    const result = new Expr(
        {
            usedRef : {},
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "COUNT",
            [
                "*"
            ]
        )
    );
    return result;
}