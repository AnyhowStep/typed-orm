import {QueryUtil} from "../../query";
import {STATISTICS} from "../statistics";
import * as exprLib from "../../expr-library";
import {IConnection} from "../../execution";

export function fetchCandidateKeysOfTable (connection : IConnection, tableName : string) {
    return QueryUtil.newInstance()
        .from(STATISTICS)
        .where(c => exprLib.nullSafeEq(
            c.TABLE_SCHEMA,
            exprLib.database()
        ))
        .where(c => exprLib.eq(
            c.TABLE_NAME,
            tableName
        ))
        //We want unique keys
        .where(c => exprLib.not(
            c.NON_UNIQUE
        ))
        .select(c => [
            c.INDEX_NAME,
            c.COLUMN_NAME,
        ])
        .orderBy(c => [
            c.INDEX_NAME.asc(),
            c.SEQ_IN_INDEX.asc(),
        ])
        .fetchAll(connection)
        .then(columns => {
            const result : {
                name : string,
                columns : string[],
            }[] = [];
            for (let column of columns) {
                let index = result.find(
                    index => index.name == column.INDEX_NAME
                );
                if (index == undefined) {
                    index = {
                        name : column.INDEX_NAME,
                        columns : [],
                    };
                    result.push(index);
                }
                index.columns.push(column.COLUMN_NAME);
            }
            return result;
        });
}