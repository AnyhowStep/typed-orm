import {ColumnMap} from "../column-map";
import {QueryTreeArray} from "../../query-tree";
import { ColumnUtil } from "../../column";

/*
    Used for unions of ColumnMap

    (A|B)[columnName] will likely give you unknown or similar
*/
export type FindWithColumnName<
   ColumnMapT extends ColumnMap,
   ColumnNameT extends string
> = (
   ColumnMapT extends ColumnMap ?
   (
       ColumnNameT extends keyof ColumnMapT ?
       ColumnMapT[ColumnNameT] :
       never
   ) :
   never
);

export function queryTree (columnMap : ColumnMap) : QueryTreeArray {
    const columnNames = Object.keys(columnMap);
    columnNames.sort();
    const result : QueryTreeArray = [];
    for (let columnName of columnNames) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(ColumnUtil.queryTree(columnMap[columnName]));
    }
    return result;
}

export type TableAlias<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"] :
    never
);

export type FindWithTableAlias<ColumnMapT extends ColumnMap, TableAliasT extends string> = (
    ColumnMapT extends ColumnMap ?
    Extract<
        ColumnMapT[Extract<keyof ColumnMapT, string>],
        { tableAlias : TableAliasT }
    > :
    never
);