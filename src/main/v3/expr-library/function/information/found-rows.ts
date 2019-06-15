import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_found-rows
export function foundRows() : (
    Expr<{
        usedRef : {},
        assertDelegate : sd.SafeMapper<bigint>,
    }>
) {
    return new Expr(
        {
            usedRef : {},
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall("FOUND_ROWS", [])
    );
}