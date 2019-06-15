import * as sd from "type-mapping";
import * as o from "../../../../dist/src/main";

export const columnMap = o.ColumnMapUtil.fromFieldArray(
    "someTable",
    [
        sd.withName(sd.unsignedInteger(), "x"),
        sd.withName(sd.mysql.dateTime(3), "y"),
        sd.withName(sd.mysql.blob(), "z"),
    ]
);
export const emptyColumnMap = o.ColumnMapUtil.fromFieldArray(
    "someEmptyTable",
    []
);
export const untypedColumnMap = o.ColumnMapUtil.fromFieldArray(
    "someUntypedTable",
    [] as sd.AnyField[]
);