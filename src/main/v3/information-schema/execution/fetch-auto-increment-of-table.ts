import {QueryUtil} from "../../query";
import {TABLES} from "../tables";
import * as exprLib from "../../expr-library";
import {IConnection} from "../../execution";

export function fetchAutoIncrementOfTable (connection : IConnection, tableName : string) : Promise<bigint|null> {
    return QueryUtil.newInstance()
        .from(TABLES)
        .where(c => exprLib.nullSafeEq(
            c.TABLE_SCHEMA,
            exprLib.database()
        ))
        .where(c => exprLib.eq(
            c.TABLE_NAME,
            tableName
        ))
        .select(c => [
            c.AUTO_INCREMENT
        ])
        .fetchValue(connection);
}