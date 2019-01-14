import {QueryTreeArray} from "../../../query-tree";
import {ExecutableDelete, DeleteModifier} from "../../delete";
import {ITable} from "../../../table";
import {QueryUtil} from "../../../query";

export function queryTree_Tables (tables : ITable[]) : QueryTreeArray {
    const result : QueryTreeArray = [];

    const alreadyAdded = new Set<string>();
    for (let table of tables) {
        if (alreadyAdded.has(table.alias)) {
            continue;
        }
        alreadyAdded.add(table.alias);

        if (result.length > 0) {
            result.push(",");
        }
        if (!table.deleteAllowed) {
            throw new Error(`Cannot delete from table ${table.alias}; explicitly not allowed`);
        }
        result.push(table.unaliasedQuery);
    }

    if (result.length == 0) {
        throw new Error(`No tables found`);
    }

    return result;
}
export function queryTree (del : ExecutableDelete) : QueryTreeArray {
    const result : QueryTreeArray = [];

    result.push("DELETE");
    if (del._modifier == DeleteModifier.IGNORE) {
        result.push("IGNORE");
    }

    result.push(queryTree_Tables(del._tables));
    result.push(QueryUtil.queryTreeFrom(del._query));
    result.push(QueryUtil.queryTreeWhere(del._query));

    return result;
}