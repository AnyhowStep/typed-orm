import {escapeId} from "sqlstring";
import {IAliasedTable} from "../../aliased-table";
import {QueryTree} from "../../../query-tree";

/*
    `name`
    `name` AS `alias`
    (SELECT x) AS `alias`
*/
export function queryTree (
    {
        alias,
        unaliasedQuery,
    } : IAliasedTable
) : QueryTree {
    const escapedAlias = escapeId(alias);

    if (unaliasedQuery === escapedAlias) {
        return unaliasedQuery;
    }

    return [
        unaliasedQuery,
        "AS",
        escapeId(alias),
    ];
}