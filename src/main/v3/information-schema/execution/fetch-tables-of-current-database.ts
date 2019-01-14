import {QueryUtil} from "../../query";
import {TABLES} from "../tables";
import * as exprLib from "../../expr-library";
import {IConnection} from "../../execution";

export function fetchTablesOfCurrentDatabase (connection : IConnection) {
    return QueryUtil.newInstance()
        .from(TABLES)
        .where(c => exprLib.nullSafeEq(
            c.TABLE_SCHEMA,
            exprLib.database()
        ))
        .orderBy(c => [
            c.TABLE_NAME.asc()
        ])
        .select(c => [c])
        .fetchAll(connection);
}