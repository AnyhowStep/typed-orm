import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
const table2 = o.table(
    "table2",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        w : sd.date(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string(),
        w : sd.date(),
    }
);
const joined2 = o.table(
    "joined2",
    {
        a : sd.date(),
        x : sd.buffer(),
        y : sd.nil()
    }
);

export const query = o.Query.innerJoinUsing(
    o.from(table),
    joined1,
    c => [c.y]
);
export const query2 = o.Query.innerJoinUsing(
    o.from(table),
    joined1,
    c => [c.x]
);
export const query3 = o.Query.innerJoinUsing(
    o.from(table),
    joined2,
    () => [table.columns.x]
);
export const query4 = o.Query.innerJoinUsing(
    o.from(table),
    table2,
    c => [c.y]
);
export const query5 = o.Query.innerJoinUsing(
    o.Query.innerJoinUsing(
        o.from(table),
        table2,
        c => [c.y]
    ),
    joined1,
    c => [c.table.y, c.table2.w]
);
export const t = o.ColumnIdentifierUtil.fromColumn<
    o.IColumn<{
        tableAlias : "a",
        name : "aName",
        assertDelegate : sd.AssertDelegate<number>
    }> |
    o.IColumn<{
        tableAlias : "b",
        name : "bName",
        assertDelegate : sd.AssertDelegate<number>
    }>
>(null as any);