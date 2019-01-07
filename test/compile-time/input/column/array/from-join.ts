import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);
const join = new o.Join(
    {
        aliasedTable : table,
        columns : table.columns,
        nullable : false,
    },
    o.JoinType.INNER,
    [],
    []
);
export const fromJoin = o.ColumnUtil.Array.fromJoin(join);

const nullableJoin = new o.Join(
    {
        aliasedTable : table,
        columns : table.columns,
        nullable : true,
    },
    o.JoinType.INNER,
    [],
    []
);
export const fromNullableJoin = o.ColumnUtil.Array.fromJoin(nullableJoin);