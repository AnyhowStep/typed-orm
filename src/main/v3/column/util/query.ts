import {escapeId} from "sqlstring";
import {IColumn} from "../column";
import {ALIASED, SEPARATOR} from "../../constants";

export function queryTree (
    {
        tableAlias,
        name,
        __subTableName,
        __isInSelectClause,
    } : IColumn
) : string {
    if (tableAlias == ALIASED) {
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
        return escapeId(`${tableAlias}${SEPARATOR}${name}`);
    } else {
        if (__subTableName == undefined) {
            if (__isInSelectClause) {
                return escapeId(`${tableAlias}${SEPARATOR}${name}`);
            } else {
                /*
                    The most common case, I think.
                */
                return (
                    escapeId(tableAlias) +
                    "." +
                    escapeId(name)
                );
            }
        } else {
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
            return (
                escapeId(tableAlias) +
                "." +
                escapeId(`${__subTableName}${SEPARATOR}${name}`)
            );
        }
    }
}
