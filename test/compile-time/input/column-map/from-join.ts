import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const t = o.table(
    "t",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
    }
);
export const j = new o.Join(
    {
        aliasedTable : t,
        columns : t.columns,
        nullable : false,
    },
    o.JoinType.FROM,
    [],
    []
);
export const columnMap = o.ColumnMapUtil.fromJoin(j);

export const nullableJ = new o.Join(
    {
        aliasedTable : t,
        columns : t.columns,
        nullable : true,
    },
    o.JoinType.FROM,
    [],
    []
);
export const nullableColumnMap = o.ColumnMapUtil.fromJoin(nullableJ);