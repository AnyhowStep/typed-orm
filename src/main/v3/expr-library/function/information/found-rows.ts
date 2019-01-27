import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_found-rows
export function foundRows() : (
    Expr<{
        usedColumns : never[],
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    return new Expr(
        {
            usedColumns : [],
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall("FOUND_ROWS", [])
    );
}