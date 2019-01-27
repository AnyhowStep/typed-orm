import {IColumn} from "../../column";
import {IExprSelectItem} from "../../../expr-select-item";
import {queryTree} from "../query";

export type As<ColumnT extends IColumn, AliasT extends string> = (
    IExprSelectItem<{
        readonly usedColumns : ColumnT[];
        readonly assertDelegate : ColumnT["assertDelegate"];

        /*
            Consider the following.

            const table = o.table(
                "table",
                {
                    x : o.boolean(),
                    y : sd.string(),
                    z : o.boolean(),
                }
            );

            o.from(table)
                .select(c => [c.z.as("x")])
                .having(c => c.x)

            c.x in the HAVING clause is now ambiguous!

            Is it c.z AS x? Or regular c.x?

            Because of this, you cannot alias to something that hides
            a column in the FROM/JOIN clauses.
        */
        readonly tableAlias : ColumnT["tableAlias"];
        readonly alias : AliasT;
    }>
);
export function as<ColumnT extends IColumn, AliasT extends string> (
    column : ColumnT,
    alias : AliasT
) : As<ColumnT, AliasT> {
    return {
        usedColumns : [column],
        assertDelegate : column.assertDelegate,
        tableAlias : column.tableAlias,
        alias : alias,
        unaliasedQuery : queryTree(column),
    };
}