import {ITable} from "../../../table";
import {TABLES} from "../../../../information-schema/tables";
import {IConnection} from "../../../../execution";
import {QueryUtil} from "../../../../query";
import * as exprLib from "../../../../expr-library";
import * as operation from "../../operation";

export interface ValidateTableArrayResult {
    warnings : string[],
    errors : string[],
}

export async function validate (tables : ITable[], connection : IConnection, result : ValidateTableArrayResult) {
    const extraDbTables = await QueryUtil.newInstance()
        .from(TABLES)
        .where(c => exprLib.nullSafeEq(
            c.TABLE_SCHEMA,
            exprLib.database()
        ))
        .where(c => exprLib.notIn(
            c.TABLE_NAME,
            ...tables.map(table => table.alias)
        ))
        .select(c => [c.TABLE_NAME])
        .fetchValueArray(connection);
    for (let extraDbTable of extraDbTables) {
        result.warnings.push(`${extraDbTable} on database; not in code`);
    }

    for (let table of tables) {
        await operation.validate(table, connection, result);
    }
}