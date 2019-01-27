import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database
export function database() : (
    Expr<{
        usedColumns : never[],
        assertDelegate : sd.AssertDelegate<string|null>,
    }>
) {
    return new Expr(
        {
            usedColumns : [],
            assertDelegate : sd.nullable(sd.string()),
        },
        new FunctionCall("DATABASE", [])
    );
}