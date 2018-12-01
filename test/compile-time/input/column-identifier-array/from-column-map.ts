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
export const columnIdentifierArray = o.ColumnIdentifierArrayUtil.fromColumnMap(columnMap);
export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);
export const emptyColumnIdentifierArray = o.ColumnIdentifierArrayUtil.fromColumnMap(emptyColumnMap);

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
export const mixedColumnIdentifierArray = o.ColumnIdentifierArrayUtil.fromColumnMap(mixedColumnMap);