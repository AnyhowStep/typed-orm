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
export const emptyColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someEmptyTable",
    {}
);

export const untypedColumnMap = o.ColumnMapUtil.fromAssertMap(
    "someUntypedTable",
    {} as o.AssertMap
);