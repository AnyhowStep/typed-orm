import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

export const columnMap = o.ColumnMapUtil.fromAssertMap(
    "someTable",
    {
        x : sd.naturalNumber(),
        y : sd.date(),
        z : sd.buffer(),
    }
);
export const columnNameArray = o.ColumnUtil.Name.Array.fromColumnMap(columnMap);
export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const emptyColumnNameArray = o.ColumnUtil.Name.Array.fromColumnMap(emptyColumnMap);

export const mixedColumnMap = o.ColumnMapUtil.intersect(
    o.ColumnMapUtil.fromAssertMap(
        "tableA",
        {
            ax : sd.naturalNumber(),
            ay : sd.string(),
        }
    ),
    o.ColumnMapUtil.fromAssertMap(
        "tableB",
        {
            bx : sd.boolean(),
            by : sd.buffer(),
        }
    )
);
export const mixedColumnNameArray = o.ColumnUtil.Name.Array.fromColumnMap(mixedColumnMap);