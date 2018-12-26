import {MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {selectExpr} from "../operation";
import * as exprLib from "../../../expr-library";
import {fetchValue} from "./fetch-value";
import {newInstance} from "../constructor";

export async function exists(
    query : MainQuery,
    connection : IConnection
) : Promise<boolean> {
    return fetchValue(
        selectExpr(
            newInstance(),
            () => exprLib.exists(query)
        ),
        connection
    );
}