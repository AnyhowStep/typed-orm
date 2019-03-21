import {QueryUtil} from "../../query";
import {COLUMNS} from "../columns";
import {IColumn} from "../../column";
import * as exprLib from "../../expr-library";
import {IConnection} from "../../execution";

export function fetchGenerationExpression (connection : IConnection, column : IColumn) {
    return QueryUtil.newInstance()
        .from(COLUMNS)
        .select(c => [c.GENERATION_EXPRESSION])
        .where(c => exprLib.nullSafeEq(
            c.TABLE_SCHEMA,
            exprLib.database()
        ))
        .where(c => exprLib.eq(
            c.TABLE_NAME,
            column.tableAlias
        ))
        .where(c => exprLib.eq(
            c.COLUMN_NAME,
            column.name
        ))
        .fetchValue(connection);
}