import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "t",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
    }
);
export const join = new o.Join(
    {
        aliasedTable : table,
        columns : table.columns,
        nullable : false,
    },
    o.JoinType.FROM,
    [],
    []
);
export const columnMap = o.ColumnMapUtil.fromJoin(join);

export const nullableJoin = new o.Join(
    {
        aliasedTable : table,
        columns : table.columns,
        nullable : true,
    },
    o.JoinType.FROM,
    [],
    []
);
export const nullableColumnMap = o.ColumnMapUtil.fromJoin(nullableJoin);

export declare const untypedJoin : o.IJoin;
export const untypedColumnMap = o.ColumnMapUtil.fromJoin(untypedJoin);