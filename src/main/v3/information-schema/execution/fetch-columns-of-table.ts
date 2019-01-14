import {QueryUtil} from "../../query";
import {COLUMNS} from "../columns";
import * as exprLib from "../../expr-library";
import {IConnection} from "../../execution";

export function fetchColumnsOfTable (connection : IConnection, tableName : string) {
    return QueryUtil.newInstance()
        .from(COLUMNS)
        .where(c => exprLib.nullSafeEq(
            c.TABLE_SCHEMA,
            exprLib.database()
        ))
        .whereEq(
            c => c.TABLE_NAME,
            tableName
        )
        .orderBy(c => [
            c.ORDINAL_POSITION.asc()
        ])
        .select(c => [
            c
            /*c.COLUMN_NAME,
            c.ORDINAL_POSITION,
            c.IS_NULLABLE,
            c.COLUMN_DEFAULT,
            c.GENERATION_EXPRESSION,
            c.EXTRA*/
        ])
        .fetchAll(connection);
}