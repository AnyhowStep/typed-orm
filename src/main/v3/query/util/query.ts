import {IQuery} from "../query";
import {QueryTreeArray} from "../../query-tree";
import {AliasedTable} from "../../aliased-table";
import {ColumnUtil} from "../../column";

export function queryTreeJoins (query : IQuery) : QueryTreeArray {
    const joins = query._joins;
    if (joins == undefined || joins.length == 0) {
        return [];
    }
    const result : QueryTreeArray = [];
    result.push(AliasedTable.queryTree(joins[0].aliasedTable));
    for (let i=1; i<joins.length; ++i) {
        const join = joins[i];
        result.push(`${join.joinType} JOIN`);
        result.push(AliasedTable.queryTree(join.aliasedTable));
        if (join.from.length == 0) {
            continue;
        }
        result.push("ON");
        result.push(join.from
            .map((from, index) => {
                const to = join.to[index];
                return [
                    ColumnUtil.queryTree(to),
                    "=",
                    ColumnUtil.queryTree(from),
                ].join(" ");
            })
            .join(" AND ")
        );
    }

    return result;
}