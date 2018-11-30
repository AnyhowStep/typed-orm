import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const columnMap = o.ColumnMapUtil.fromFieldArray(
    "someTable",
    [
        sd.field("x", sd.naturalNumber()),
        sd.field("y", sd.date()),
        sd.field("z", sd.buffer()),
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