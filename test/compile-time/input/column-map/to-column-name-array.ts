import * as sd from "schema-decorator";
import * as o from "../../../../src/main";

export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);
export const columnNameArray = o.ColumnMapUtil.toColumnNameArray(columnMap);
export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const emptyColumnNameArray = o.ColumnMapUtil.toColumnNameArray(emptyColumnMap);