import {ITable} from "../../table";
import * as informationSchema from "../../../information-schema/execution";
import {IConnection} from "../../../execution";
import {KeyUtil} from "../../../key";

export interface ValidateTableResult {
    warnings : string[],
    errors : string[],
}

export async function validateColumns (
    table : ITable,
    connection : IConnection,
    result : ValidateTableResult
) {
    const dbColumns = await informationSchema.fetchColumnsOfTable(
        connection,
        table.alias
    );

    if (dbColumns.length == 0) {
        result.errors.push(`Table ${table.alias} has no columns or does not exist`);
        return;
    }

    for (let dbColumn of dbColumns) {
        const dbAutoIncrement = (dbColumn.EXTRA == "auto_increment");
        const dbGenerated = (dbColumn.GENERATION_EXPRESSION != "");
        const dbExplicitDefault = (dbColumn.COLUMN_DEFAULT != undefined);
        const dbNullable = (dbColumn.IS_NULLABLE === "YES");

        const codeColumn = table.columns[dbColumn.COLUMN_NAME];
        const codeAutoIncrement = (table.autoIncrement === dbColumn.COLUMN_NAME);
        //TODO-REFACTOR Maybe table.generated should really mean generated only?
        //Yikes
        const codeGeneratedOrAutoIncrement = table.generated.includes(dbColumn.COLUMN_NAME);
        const codeGenerated = (
            codeGeneratedOrAutoIncrement &&
            !codeAutoIncrement
        );
        //TODO-REFACTOR Maybe table.hasExplicitDefaultValue should really mean hasExplicitDefaultValue only?
        //Yikes
        const codeExplicitDefaultOrGeneratedOrAutoIncrement = table.hasExplicitDefaultValue.includes(dbColumn.COLUMN_NAME);
        const codeExplicitDefault = (
            codeExplicitDefaultOrGeneratedOrAutoIncrement &&
            !codeGeneratedOrAutoIncrement
        );
        const codeNullable = table.isNullable.includes(dbColumn.COLUMN_NAME);

        if (codeColumn == undefined) {
            result.warnings.push(`${table.alias}.${dbColumn.COLUMN_NAME} is on database; not in code`);
            if (dbAutoIncrement) {
                result.warnings.push(`This should be fine as INSERTs to ${table.alias} should set ${table.alias}.${dbColumn.COLUMN_NAME} to an auto-increment value`);
                continue;
            }
            if (dbGenerated) {
                result.warnings.push(`This should be fine as INSERTs to ${table.alias} should set ${table.alias}.${dbColumn.COLUMN_NAME} to generation expression: ${dbColumn.GENERATION_EXPRESSION}`);
                continue;
            }
            if (dbExplicitDefault) {
                result.warnings.push(`This should be fine as INSERTs to ${table.alias} should set ${table.alias}.${dbColumn.COLUMN_NAME} to default: ${dbColumn.COLUMN_DEFAULT}`);
                continue;
            }
            if (dbNullable) {
                result.warnings.push(`This should be fine as INSERTs to ${table.alias} should set ${table.alias}.${dbColumn.COLUMN_NAME} to NULL`);
                continue;
            }

            result.errors.push(`INSERTs to ${table.alias} will fail as ${table.alias}.${dbColumn.COLUMN_NAME} is missing in code, is not generated, is not nullable, and does not have a default value`);
        } else {
            if (dbAutoIncrement) {
                if (!codeAutoIncrement) {
                    result.errors.push(`${table.alias}.${dbColumn.COLUMN_NAME} is auto_increment on database; not in code`);
                }
                if (table.autoIncrement == undefined) {
                    result.warnings.push(`${table.alias}.${dbColumn.COLUMN_NAME} is auto_increment on database; code does not have auto_increment column`);
                }
            } else {
                if (codeAutoIncrement) {
                    result.errors.push(`${table.alias}.${dbColumn.COLUMN_NAME} is auto_increment in code; not on database`);
                }
            }

            if (dbGenerated) {
                if (!codeGeneratedOrAutoIncrement) {
                    result.errors.push(`${table.alias}.${dbColumn.COLUMN_NAME} is generated on database; not in code`);
                }
            } else {
                if (codeGenerated) {
                    result.errors.push(`${table.alias}.${dbColumn.COLUMN_NAME} is generated in code; not on database`);
                }
            }

            if (dbExplicitDefault) {
                if (!codeExplicitDefaultOrGeneratedOrAutoIncrement) {
                    result.warnings.push(`${table.alias}.${dbColumn.COLUMN_NAME} has explicit default value on database; not in code`);
                }
            } else {
                if (codeExplicitDefault) {
                    result.errors.push(`${table.alias}.${dbColumn.COLUMN_NAME} has explicit default value in code; not on database`);
                }
            }

            if (dbNullable) {
                if (!codeNullable) {
                    result.warnings.push(`${table.alias}.${dbColumn.COLUMN_NAME} is nullable on database; not in code`);
                }
            } else {
                if (codeNullable) {
                    result.errors.push(`${table.alias}.${dbColumn.COLUMN_NAME} is nullable in code; not on database`);
                }
            }
        }
    }

    const isColumnOnDb = (columnName : string) => dbColumns.some(
        dbColumn => columnName == dbColumn.COLUMN_NAME
    );
    const extraColumnNames = Object.keys(table.columns)
        .filter(columnName => !isColumnOnDb(columnName));
    for (let extraColumnName of extraColumnNames) {
        result.errors.push(`${table.alias}.${extraColumnName} is in code; not on database`);
    }
}
export async function validateCandidateKeys (
    table : ITable,
    connection : IConnection,
    result : ValidateTableResult
) {
    const dbCandidateKeys = await informationSchema.fetchCandidateKeysOfTable(
        connection, table.alias
    );

    if (dbCandidateKeys.length > 0) {
        if (table.candidateKeys.length > 0) {
            for (let dbCandidateKey of dbCandidateKeys) {
                if (!KeyUtil.Array.hasKey(table.candidateKeys, dbCandidateKey.columns)) {
                    result.warnings.push(`${table.alias} has candidate key ${dbCandidateKey.name}(${dbCandidateKey.columns.join(",")}) on database; not in code`);
                }
            }
            const dbCandidateKeys2 = dbCandidateKeys.map(ck => ck.columns);
            for (let codeCandidateKey of table.candidateKeys) {
                if (!KeyUtil.Array.hasKey(dbCandidateKeys2, codeCandidateKey)) {
                    result.errors.push(`${table.alias} has candidate key (${codeCandidateKey.join(",")}) in code; not on database`);
                }
            }
        } else {
            result.warnings.push(`${table.alias} has ${dbCandidateKeys.length} candidate keys on database; none in code`);
        }
    } else {
        if (table.candidateKeys.length > 0) {
            result.errors.push(`${table.alias} has ${table.candidateKeys.length} candidate keys in code; none on database`);
        } else {
            //Kind of dangerous for a table to not have any candidate keys
            result.errors.push(`${table.alias} has no candidate keys on both database and in code`);
        }
    }
}
export async function validate (table : ITable, connection : IConnection, result : ValidateTableResult) {
    if (!await informationSchema.tableExists(
        connection,
        table.alias
    )) {
        result.errors.push(`Table ${table.alias} does not exist`);
        return;
    }

    await validateColumns(table, connection, result);
    await validateCandidateKeys(table, connection, result);
}