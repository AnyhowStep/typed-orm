import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);
export const columnMapWithTableAlias = o.ColumnMapUtil.withTableAlias(
    columnMap,
    "someAlias"
);

export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const emptyColumnMapWithTableAlias = o.ColumnMapUtil.withTableAlias(
    emptyColumnMap,
    "someAlias"
);

export const unitColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        a : sd.string(),
    }
);
export const unitColumnMapWithTableAlias = o.ColumnMapUtil.withTableAlias(
    unitColumnMap,
    "someAlias"
);

export declare const untypedColumnMap : o.ColumnMap;
export const untypedColumnMapWithTableAlias = o.ColumnMapUtil.withTableAlias(
    untypedColumnMap,
    "someAlias"
);