import {escapeId} from "sqlstring";
import {IColumn} from "../../column";
import {ALIASED, SEPARATOR} from "../../../constants";

export function queryTree (
    {
        tableAlias,
        name,
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
    }
}
