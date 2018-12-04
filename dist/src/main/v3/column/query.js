"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const sd = require("schema-decorator");
const constants_1 = require("../constants");
const string_array_1 = require("../string-array");
function queryTree({ tableAlias, name, __subTableName, __isInSelectClause, }) {
    if (tableAlias == constants_1.ALIASED) {
        /*
            When you want to write,
            (1 + 2) AS three

            You write,
            add(1, 2).as("three")

            This "three" is an IExprSelectItem but has no tableAlias
            associated with it.

            So, this library makes up a table alias that is very
            unlikely to be used naturally by others.
        */
        return sqlstring_1.escapeId(`${tableAlias}--${name}`);
    }
    else {
        if (__subTableName == undefined) {
            if (__isInSelectClause) {
                return sqlstring_1.escapeId(`${tableAlias}--${name}`);
            }
            else {
                /*
                    The most common case, I think.
                */
                return (sqlstring_1.escapeId(tableAlias) +
                    "." +
                    sqlstring_1.escapeId(name));
            }
        }
        else {
            /*
                {
                    "tableAlias":"otherUser",
                    "name":"externalUserId",
                    "subTableName":"user",
                    "isSelectReference":false,
                    "fullName":"`otherUser`.`user--externalUserId`"
                }

                SELECT
                    `otherUser`.`user--externalUserId` AS `otherUser--externalUserId`
                FROM
                    `app`
                INNER JOIN
                    (
                        SELECT
                            `user`.`appId` AS `user--appId`,
                            `user`.`externalUserId` AS `user--externalUserId`
                        FROM
                            `user`
                    ) AS `otherUser`
                ON
                    `app`.`appId` = `otherUser`.`user--appId`
            */
            return (sqlstring_1.escapeId(tableAlias) +
                "." +
                sqlstring_1.escapeId(`${__subTableName}--${name}`));
        }
    }
}
exports.queryTree = queryTree;
//TODO Figure out naming convention
function nameArrayFromColumnMap(columnMap) {
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return Object.keys(columnMap);
}
exports.nameArrayFromColumnMap = nameArrayFromColumnMap;
//TODO Figure out naming convention
function nameArrayFromColumnRef(columnRef) {
    const tableAliases = Object.keys(columnRef);
    const columnNames = tableAliases
        .reduce((memo, tableAlias) => {
        const arr = nameArrayFromColumnMap(columnRef[tableAlias]);
        memo.push(...arr);
        return memo;
    }, []);
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return string_array_1.StringArrayUtil.uniqueString(columnNames);
}
exports.nameArrayFromColumnRef = nameArrayFromColumnRef;
function nullableNameArrayFromColumnMap(columnMap) {
    const columnNames = Object.keys(columnMap);
    return columnNames.filter(columnName => sd.isNullable(columnMap[columnName].assertDelegate));
}
exports.nullableNameArrayFromColumnMap = nullableNameArrayFromColumnMap;
//# sourceMappingURL=query.js.map